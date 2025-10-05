#!/usr/bin/env bun

import * as p from '@clack/prompts'
import pc from 'picocolors'
import { collectUserInputs, displayOutro } from './prompts'
import { scaffoldProject } from './scaffold'

async function main() {
	console.clear()

	p.intro(
		`${pc.bgCyan(pc.black(' bunup '))} ${pc.cyan('Library Scaffolding CLI')}`,
	)

	const config = await collectUserInputs()
	await scaffoldProject(config)

	displayOutro(
		config.projectName,
		config.libraryType,
		config.stylingOption,
		config.isMonorepo,
	)
}

main().catch((error) => {
	console.error(pc.red('Unexpected error:'), error)
	process.exit(1)
})
