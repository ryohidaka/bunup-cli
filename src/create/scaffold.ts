import path from 'node:path'
import * as p from '@clack/prompts'
import { $ } from 'bun'
import { downloadTemplate } from 'giget'
import pc from 'picocolors'
import { replaceInFile } from 'replace-in-file'
import { templateConfig } from './constants'
import type { ProjectConfig } from './prompts'
import { extractPackageName, renameTemplateVariables } from './utils'

function getTemplateDirectory(config: ProjectConfig): string {
	if (config.libraryType === 'react') {
		return templateConfig[config.complexity].react[
			config.stylingOption as keyof typeof templateConfig.minimal.react
		]
	}

	const tsConfig = templateConfig[config.complexity].typescript
	return config.isMonorepo ? tsConfig.monorepo : tsConfig.single
}

function prepareVariables(config: ProjectConfig): Record<string, string> {
	const firstPackageName = config.firstPackageName || config.projectName
	return {
		project_name: config.isMonorepo
			? `${config.projectName}-monorepo`
			: config.projectName,
		project_description: config.description,
		repo_name: config.repoName,
		username: config.username,
		first_package_name: extractPackageName(firstPackageName),
	}
}

export async function scaffoldProject(config: ProjectConfig): Promise<void> {
	const templateDir = getTemplateDirectory(config)
	const projectPath = path.join(
		process.cwd(),
		extractPackageName(config.projectName),
	)
	const s = p.spinner()

	s.start(`Creating ${config.projectName}...`)

	try {
		await downloadTemplate(`github:bunup/templates/${templateDir}`, {
			dir: projectPath,
		})

		s.message('Applying template variables...')

		const variables = prepareVariables(config)

		const replacements = Object.entries(variables).map(([key, value]) => ({
			from: new RegExp(`\\[${key}\\]`, 'g'),
			to: value,
		}))

		await replaceInFile({
			files: path.join(projectPath, '**/*'),
			from: replacements.map((r) => r.from),
			to: replacements.map((r) => r.to),
			ignore: ['node_modules', 'dist', 'bun.lock', '.git'],
		})

		await renameTemplateVariables(projectPath, variables)

		s.message('Installing dependencies...')
		await $`cd ${projectPath} && bun install`.quiet()

		s.message('Building project...')
		await $`cd ${projectPath} && bun run build`.quiet()

		s.stop(`${pc.green('✓')} Project scaffolded successfully!`)
	} catch (error) {
		s.stop(`${pc.red('✗')} Failed to scaffold project`)
		p.cancel(`Error: ${error}`)
		process.exit(1)
	}
}
