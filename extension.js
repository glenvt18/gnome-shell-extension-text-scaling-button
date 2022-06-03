/* extension.js
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * SPDX-License-Identifier: GPL-2.0-or-later
 */

/* exported init */

const GETTEXT_DOMAIN = 'textscalingbutton@glenvt18';

const { GObject, St, Gio } = imports.gi;

const ExtensionUtils = imports.misc.extensionUtils;
const Main = imports.ui.main;
const PanelMenu = imports.ui.panelMenu;
const PopupMenu = imports.ui.popupMenu;

const _ = ExtensionUtils.gettext;

const TEXT_SCALING_FACTOR = 'text-scaling-factor'
const CURSOR_SIZE = 'cursor-size'
const DASH_MAX_ICON_SIZE = 'dash-max-icon-size'

const Indicator = GObject.registerClass(
class Indicator extends PanelMenu.Button {
    _init() {
        super._init(0.0, _('Text scaling button'));

        this.if_settings = new Gio.Settings({ schema_id: 'org.gnome.desktop.interface' })
        this.dock_settings = new Gio.Settings({ schema_id: 'org.gnome.shell.extensions.dash-to-dock' })

        this.add_child(new St.Icon({
            icon_name: 'font-size-symbolic',
            style_class: 'system-status-icon',
        }));

        let item;

        item = new PopupMenu.PopupMenuItem(_('Laptop') + ' 125%');
        item.connect('activate', () => {
            this.if_settings.set_double(TEXT_SCALING_FACTOR, 1.25);
            this.if_settings.set_int(CURSOR_SIZE, 28);
            this.dock_settings.set_int(DASH_MAX_ICON_SIZE, 34);
        });
        this.menu.addMenuItem(item);

        item = new PopupMenu.PopupMenuItem(_('Laptop') + ' 150%');
        item.connect('activate', () => {
            this.if_settings.set_double(TEXT_SCALING_FACTOR, 1.5);
            this.if_settings.set_int(CURSOR_SIZE, 32);
            this.dock_settings.set_int(DASH_MAX_ICON_SIZE, 42);
        });
        this.menu.addMenuItem(item);

        item = new PopupMenu.PopupMenuItem(_('Monitor'));
        item.connect('activate', () => {
            this.if_settings.set_double(TEXT_SCALING_FACTOR, 1.0);
            this.if_settings.set_int(CURSOR_SIZE, 24);
            this.dock_settings.set_int(DASH_MAX_ICON_SIZE, 28);
        });
        this.menu.addMenuItem(item);
    }
});

class Extension {
    constructor(uuid) {
        this._uuid = uuid;

        ExtensionUtils.initTranslations(GETTEXT_DOMAIN);
    }

    enable() {
        this._indicator = new Indicator();
        Main.panel.addToStatusArea(this._uuid, this._indicator);
    }

    disable() {
        this._indicator.destroy();
        this._indicator = null;
    }
}

function init(meta) {
    return new Extension(meta.uuid);
}
