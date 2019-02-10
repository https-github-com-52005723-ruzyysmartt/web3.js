/*
    This file is part of web3.js.

    web3.js is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    web3.js is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/
/**
 * @file AccountsModuleFactory.js
 * @author Samuel Furter <samuel@ethereum.org>
 * @date 2018
 */

import Accounts from '../Accounts';
import Account from '../Account';
import Wallet from '../Wallet';

export default class AccountsModuleFactory {
    /**
     * @param {Utils} utils
     * @param {Object} formatters
     *
     * @constructor
     */
    constructor(utils, formatters) {
        this.utils = utils;
        this.formatters = formatters;
    }

    /**
     * Returns an object of type Accounts
     *
     * @param {EthereumProvider|HttpProvider|WebsocketProvider|IpcProvider|String} provider
     * @param {ProvidersModuleFactory} providersModuleFactory
     * @param {MethodModuleFactory} methodModuleFactory
     * @param {Object} options
     *
     * @returns {Accounts}
     */
    createAccounts(provider, providersModuleFactory, methodModuleFactory, options) {
        return new Accounts(
            provider,
            providersModuleFactory,
            methodModuleFactory,
            this.createMethodFactory(methodModuleFactory),
            this.utils,
            this.formatters,
            // const cryp = typeof global === 'undefined' ? require('crypto-browserify') : require('crypto');
            options
        );
    }

    /**
     * Returns an object of type Wallet
     *
     * @method createWallet
     *
     * @param {Accounts} accounts
     *
     * @returns {Wallet}
     */
    createWallet(accounts) {
        return new Wallet(accounts);
    }

    /**
     * Returns an object of type Account
     *
     * @method createAccount
     *
     * @param {object} accountOptions
     * @param {Accounts} accounts
     *
     * @returns {Account}
     */
    createAccount(accountOptions, accounts) {
        return new Account(accountOptions, accounts)
    }

    /**
     * Returns an object of type MethodFactory
     *
     * @method createMethodFactory
     *
     * @param {MethodModuleFactory} methodModuleFactory
     *
     * @returns {MethodFactory}
     */
    createMethodFactory(methodModuleFactory) {
        return new MethodFactory(methodModuleFactory, this.utils, this.formatters);
    }
}
