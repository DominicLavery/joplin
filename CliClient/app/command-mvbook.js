const { BaseCommand } = require('./base-command.js');
const { app } = require('./app.js');
const { _ } = require('lib/locale.js');
const Folder = require('lib/models/Folder.js');
const BaseModel = require('lib/BaseModel.js');

class Command extends BaseCommand {
	usage() {
		return 'mvbook <new-parent>';
	}

	description() {
		return _('Moves the selected notebook to <new-parent>.');
	}

	async action(args) {
		if (!app().currentFolder()) throw new Error(_('No notebook selected'));

		const pattern = args['new-parent'];
		if (pattern == '/') {
			const folder = app().currentFolder();
			const newItem = {
				id: folder.id,
				parent_id: '',
			};
			await Folder.save(newItem);
			return;
		}

		const folder = await app().loadItem(BaseModel.TYPE_FOLDER, pattern);
		if (!folder) throw new Error(_('Cannot find "%s".', pattern));

		await Folder.moveToFolder(app().currentFolder().id, folder.id);
	}
}

module.exports = Command;
