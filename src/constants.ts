export const randomProjectNames: string[] = [
	'stellar-components',
	'quantum-library',
	'nexus-toolkit',
	'aurora-components',
	'phoenix-lib',
	'zenith-ui',
	'cosmos-components',
	'nimbus-library',
	'prism-toolkit',
	'odyssey-components',
]

export const randomDescriptions: string[] = [
	'A modern component library built with cutting-edge technologies',
	'Blazing fast components for modern web applications',
	'Next-generation UI components with developer experience in mind',
	'Elegant and performant component library',
	'Type-safe components for scalable applications',
	'Beautiful, accessible, and customizable components',
	'Production-ready component library with best practices',
	'Lightweight and flexible component toolkit',
	'Enterprise-grade component library solution',
	'Developer-friendly component ecosystem',
]

export const templateConfig = {
	minimal: {
		typescript: {
			single: 'minimal-ts',
			monorepo: 'minimal-ts-monorepo',
		},
		react: {
			'pure-css': 'minimal-react-pure-css',
			'css-modules': 'minimal-react-css-modules',
			tailwindcss: 'minimal-react-tailwindcss',
		},
	},
	full: {
		typescript: {
			single: 'full-ts',
			monorepo: 'full-ts-monorepo',
		},
		react: {
			'pure-css': 'full-react-pure-css',
			'css-modules': 'full-react-css-modules',
			tailwindcss: 'full-react-tailwindcss',
		},
	},
}
