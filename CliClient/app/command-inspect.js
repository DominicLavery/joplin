const { BaseCommand } = require('./base-command.js');
const { app } = require('./app.js');
const { _ } = require('lib/locale.js');

class Command extends BaseCommand {
	usage() {
		return 'inspect';
	}

	description() {
		return _('Inspect the currently selected folder');
	}

	async action() {
		if (!app().currentFolder()) throw new Error(_('There is no currently selected folder'));
		this.stdout(JSON.stringify(app().currentFolder(), null, 2));
		this.stdout('\n');

		app().gui().showConsole();
	}
}

module.exports = Command;
