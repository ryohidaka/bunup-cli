#!/usr/bin/env bun

import * as p from '@clack/prompts'
import pc from 'picocolors'
import { cli } from 'zlye'
import { version } from '../package.json'
import { collectUserInputs, displayOutro } from './create/prompts'
import { scaffoldProject } from './create/scaffold'

const program = cli()
	.name('@bunup/cli')
	.description('Official CLI for Bunup')
	.version(version)

program.command('create').action(async () => {
	p.intro(
		`${pc.bgCyan(pc.black(' bunup '))} ${pc.cyan(' Scaffold a new project with Bunup ')}`,
	)

	const config = await collectUserInputs()
	await scaffoldProject(config)

	displayOutro(
		config.projectName,
		config.libraryType,
		config.stylingOption,
		config.isMonorepo,
	)
})

async function main() {
	program.parse()
}

main().catch((error) => {
	console.error(pc.red('Unexpected error:'), error)
	process.exit(1)
})
