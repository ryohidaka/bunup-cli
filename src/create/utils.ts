import fs from 'node:fs/promises'
import path from 'node:path'

export function getRandomItem<T>(array: T[]): T {
	return array[Math.floor(Math.random() * array.length)]
}

export function extractPackageName(name: string): string {
	return name.includes('/') ? (name.split('/').pop() as string) : name
}

export function stripNonAlphabeticCharacters(str: string): string {
	return str.replace(/[^a-zA-Z]/g, '')
}

export async function replaceTemplateVariablesInFilenames(
	projectPath: string,
	variables: Record<string, string>,
): Promise<void> {
	const walkDir = async (dir: string) => {
		const entries = await fs.readdir(dir, { withFileTypes: true })

		for (const entry of entries) {
			const oldPath = path.join(dir, entry.name)
			let newName = entry.name

			for (const [placeholder, value] of Object.entries(variables)) {
				newName = newName.replace(
					new RegExp(`\\[${placeholder}\\]`, 'g'),
					value,
				)
			}

			const newPath = path.join(dir, newName)

			if (oldPath !== newPath) {
				await fs.rename(oldPath, newPath)
			}

			if (entry.isDirectory()) {
				await walkDir(newPath)
			}
		}
	}

	await walkDir(projectPath)
}
