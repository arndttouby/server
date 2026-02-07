/**
 * SPDX-FileCopyrightText: 2018 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { OCSResponse } from '@nextcloud/typings/ocs'
import type { IAppstoreApp, IAppstoreCategory } from '../apps.d.ts'

import axios from '@nextcloud/axios'
import { confirmPassword } from '@nextcloud/password-confirmation'
import { generateOcsUrl } from '@nextcloud/router'
import { APPSTORE_CATEGORY_ICONS } from '../constants.ts'

const BASE_URL = generateOcsUrl('apps/appstore/api/v1')
const Url = Object.freeze({
	apps: `${BASE_URL}/apps`,
	categories: `${BASE_URL}/apps/categories`,
	enable: `${BASE_URL}/apps/enable`,
	forceEnable: `${BASE_URL}/apps/force`,
	disable: `${BASE_URL}/apps/disable`,
	uninstall: `${BASE_URL}/apps/uninstall`,
	update: `${BASE_URL}/apps/update`,
})

/**
 * Force enable app by ignoring its dependencies
 *
 * @param appId - The app to force enable
 */
export async function forceEnableApp(appId: string) {
	await confirmPassword()
	await axios.post(Url.forceEnable, { appId })
}

/**
 * Enable an app by its app id
 *
 * @param appId - The app to enable
 */
export async function enableApp(appId: string) {
	await confirmPassword()
	await axios.post(Url.enable, { appId })
}

/**
 * Disable app by its app id
 *
 * @param appId - The app to disable
 */
export async function disableApp(appId: string) {
	await confirmPassword()
	await axios.post(Url.disable, { appId })
}

/**
 * Update an app by its app id
 *
 * @param appId - The app id to update
 */
export async function updateApp(appId: string) {
	await confirmPassword()
	await axios.post(Url.update, { appId })
}

/**
 * Uninstall an app by its app id
 *
 * @param appId - The app to uninstall
 */
export async function uninstallApp(appId: string) {
	await confirmPassword()
	await axios.post(Url.uninstall, { appId })
}

/**
 * Get all apps from the appstore
 */
export async function getApps() {
	const { data } = await axios.get<OCSResponse<IAppstoreApp[]>>(Url.apps)
	return data.ocs.data
}

/**
 * Get app categories
 */
export async function getCategories() {
	const { data } = await axios.get<OCSResponse<IAppstoreCategory[]>>(Url.categories)
	for (const category of data.ocs.data) {
		category.icon = APPSTORE_CATEGORY_ICONS[category.id] ?? ''
	}
	return data.ocs.data
}
