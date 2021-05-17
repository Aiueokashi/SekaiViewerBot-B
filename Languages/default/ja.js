const chalk = require('chalk'),
	os = require('os');

class Language {
	constructor(client) {
		this.client = client;

		this.language = {
			flag: '🇯🇵',
			local: 'ja',

			message: (message, cmd) => [
				'`<<cmd>>`コマンドを使うには`<<time>>`秒待ってください',
				`${message.author} 引数がありません!`,
				{
					title: `${cmd.name.replace(/\b\w/g, l => l.toUpperCase())}`,
					description: `> ${cmd.description}`,
					fields: [
						{
							name: '構文',
							value: `\`\`\`${cmd.usage}\`\`\``
						},
						{
							name: '使用例',
							value: `\`\`\`${(cmd.exemple &&
								cmd.exemple
									.map(
										x =>
											`${message.guild.settings.prefix ||
												this.client.config.prefix}${cmd.name} ${x}`
									)
									.join('\n')) ||
								'No examples provided'}\`\`\``
						}
					]
				},
				'このbotにコマンドを実行するための権限がたりません',
				'このコマンドを実行する権限がありません'
			],
			mylang: () => [
			  '同じ言語を設定することはできません。',
			  'ユーザー言語が変更されました。',
			  '設定した言語:'
			  ],
			chara: () => [
			  args => `キャラクターを見つけることができませんでした: ${args}`,
			  args => `このIDのキャラクターIDは割り当てられていません: ${args}`
			  ],
			language: () => ['どの国の言葉を使いますか？', '日本語に設定しました。'],
			reload: () => [
				'jsonファイルを再読み込みしました。',
				cmds => `\`${cmds}\`個のコマンドを再読み込みしました。`,
				'イベントハンドラを再読み込みしました。',
				langs => `\`${langs.length}\`個の言語ファイルを再読み込みしました。`,
				models =>
					`\`${models.length}\`個のデータスキーマを再読み込みしました。`,
				{
					title: `拡張機能のキャッシュを全て破棄しました。: ${client.user.tag}`,
					fields: [
						{
							name: 'Commands',
							value: `${
								client.commands.length
							} : \`\`\`${client.commands.keyArray().toString()}\`\`\``
						},
						{
							name: 'EventHandler',
							value: `${
								client.events.length
							} : \`\`\`${client.events.keyArray().toString()}\`\`\``
						},
						{
							name: 'DatabaseModels',
							value: `${
								client.db.length
							} : \`\`\`${client.db.keyArray().toString()}\`\`\``
						},
						{
							name: 'Languages',
							value: `${
								client.language.length
							} : \`\`\`${client.language.keyArray().toString()}\`\`\``
						}
					]
				}
			]
		};
	}
	get(term, ...args) {
		const value = this.language[String(term)];
		return typeof value === 'function' ? value(...args) : value;
	}
}

module.exports = Language;
