const {
	Collection,
	MessageAttachment,
	MessageEmbed,
	Permissions
} = require('discord.js');
const episodes = require('../assets/data/cardEpisodes.json');
const rarities = require('../assets/data/cardRarities.json');

class SekaiUtil {
	constructor(client) {
		this.client = client;
	}

	getMax(card) {
		const rarity = rarities.find(rarity => rarity.rarity === card.rarity);

		const maxLevel = rarity.trainingMaxLevel || rarity.maxLevel;

		let maxParam =
			card.cardParameters
				.filter(cp => cp.cardLevel === maxLevel)
				.reduce((sum, cp) => {
					sum += cp.power;
					return sum;
				}, 0) +
			episodes
				.filter(episode => episode.cardId === card.id)
				.reduce((sum, episode) => {
					sum += episode.power1BonusFixed;
					sum += episode.power2BonusFixed;
					sum += episode.power3BonusFixed;
					return sum;
				}, 0);
		if (card.rarity >= 3)
			maxParam +=
				card.specialTrainingPower1BonusFixed +
				card.specialTrainingPower2BonusFixed +
				card.specialTrainingPower3BonusFixed;

		return maxParam;
	}

	resolveUser(text, users, caseSensitive = false, wholeWord = false) {
		return (
			users.get(text) ||
			users.find(user => this.checkUser(text, user, caseSensitive, wholeWord))
		);
	}

	resolveUsers(text, users, caseSensitive = false, wholeWord = false) {
		return users.filter(user =>
			this.checkUser(text, user, caseSensitive, wholeWord)
		);
	}

	checkUser(text, user, caseSensitive = false, wholeWord = false) {
		if (user.id === text) return true;

		const reg = /<@!?(\d{17,19})>/;
		const match = text.match(reg);

		if (match && user.id === match[1]) return true;

		text = caseSensitive ? text : text.toLowerCase();
		const username = caseSensitive
			? user.username
			: user.username.toLowerCase();
		const discrim = user.discriminator;

		if (!wholeWord) {
			return (
				username.includes(text) ||
				(username.includes(text.split('#')[0]) &&
					discrim.includes(text.split('#')[1]))
			);
		}

		return (
			username === text ||
			(username === text.split('#')[0] && discrim === text.split('#')[1])
		);
	}

	resolveMember(text, members, caseSensitive = false, wholeWord = false) {
		return (
			members.get(text) ||
			members.find(member =>
				this.checkMember(text, member, caseSensitive, wholeWord)
			)
		);
	}

	resolveMembers(text, members, caseSensitive = false, wholeWord = false) {
		return members.filter(member =>
			this.checkMember(text, member, caseSensitive, wholeWord)
		);
	}

	checkMember(text, member, caseSensitive = false, wholeWord = false) {
		if (member.id === text) return true;

		const reg = /<@!?(\d{17,19})>/;
		const match = text.match(reg);

		if (match && member.id === match[1]) return true;

		text = caseSensitive ? text : text.toLowerCase();
		const username = caseSensitive
			? member.user.username
			: member.user.username.toLowerCase();
		const displayName = caseSensitive
			? member.displayName
			: member.displayName.toLowerCase();
		const discrim = member.user.discriminator;

		if (!wholeWord) {
			return (
				displayName.includes(text) ||
				username.includes(text) ||
				((username.includes(text.split('#')[0]) ||
					displayName.includes(text.split('#')[0])) &&
					discrim.includes(text.split('#')[1]))
			);
		}

		return (
			displayName === text ||
			username === text ||
			((username === text.split('#')[0] ||
				displayName === text.split('#')[0]) &&
				discrim === text.split('#')[1])
		);
	}

	resolveChannel(text, channels, caseSensitive = false, wholeWord = false) {
		return (
			channels.get(text) ||
			channels.find(channel =>
				this.checkChannel(text, channel, caseSensitive, wholeWord)
			)
		);
	}

	resolveChannels(text, channels, caseSensitive = false, wholeWord = false) {
		return channels.filter(channel =>
			this.checkChannel(text, channel, caseSensitive, wholeWord)
		);
	}

	checkChannel(text, channel, caseSensitive = false, wholeWord = false) {
		if (channel.id === text) return true;

		const reg = /<#(\d{17,19})>/;
		const match = text.match(reg);

		if (match && channel.id === match[1]) return true;

		text = caseSensitive ? text : text.toLowerCase();
		const name = caseSensitive ? channel.name : channel.name.toLowerCase();

		if (!wholeWord) {
			return name.includes(text) || name.includes(text.replace(/^#/, ''));
		}

		return name === text || name === text.replace(/^#/, '');
	}

	resolveRole(text, roles, caseSensitive = false, wholeWord = false) {
		return (
			roles.get(text) ||
			roles.find(role => this.checkRole(text, role, caseSensitive, wholeWord))
		);
	}

	resolveRoles(text, roles, caseSensitive = false, wholeWord = false) {
		return roles.filter(role =>
			this.checkRole(text, role, caseSensitive, wholeWord)
		);
	}

	checkRole(text, role, caseSensitive = false, wholeWord = false) {
		if (role.id === text) return true;

		const reg = /<@&(\d{17,19})>/;
		const match = text.match(reg);

		if (match && role.id === match[1]) return true;

		text = caseSensitive ? text : text.toLowerCase();
		const name = caseSensitive ? role.name : role.name.toLowerCase();

		if (!wholeWord) {
			return name.includes(text) || name.includes(text.replace(/^@/, ''));
		}

		return name === text || name === text.replace(/^@/, '');
	}

	resolveEmoji(text, emojis, caseSensitive = false, wholeWord = false) {
		return (
			emojis.get(text) ||
			emojis.find(emoji =>
				this.checkEmoji(text, emoji, caseSensitive, wholeWord)
			)
		);
	}

	resolveEmojis(text, emojis, caseSensitive = false, wholeWord = false) {
		return emojis.filter(emoji =>
			this.checkEmoji(text, emoji, caseSensitive, wholeWord)
		);
	}

	checkEmoji(text, emoji, caseSensitive = false, wholeWord = false) {
		if (emoji.id === text) return true;

		const reg = /<a?:[a-zA-Z0-9_]+:(\d{17,19})>/;
		const match = text.match(reg);

		if (match && emoji.id === match[1]) return true;

		text = caseSensitive ? text : text.toLowerCase();
		const name = caseSensitive ? emoji.name : emoji.name.toLowerCase();

		if (!wholeWord) {
			return name.includes(text) || name.includes(text.replace(/:/, ''));
		}

		return name === text || name === text.replace(/:/, '');
	}

	resolveGuild(text, guilds, caseSensitive = false, wholeWord = false) {
		return (
			guilds.get(text) ||
			guilds.find(guild =>
				this.checkGuild(text, guild, caseSensitive, wholeWord)
			)
		);
	}

	resolveGuilds(text, guilds, caseSensitive = false, wholeWord = false) {
		return guilds.filter(guild =>
			this.checkGuild(text, guild, caseSensitive, wholeWord)
		);
	}

	checkGuild(text, guild, caseSensitive = false, wholeWord = false) {
		if (guild.id === text) return true;

		text = caseSensitive ? text : text.toLowerCase();
		const name = caseSensitive ? guild.name : guild.name.toLowerCase();

		if (!wholeWord) return name.includes(text);
		return name === text;
	}

	permissionNames() {
		return Object.keys(Permissions.FLAGS);
	}

	resolvePermissionNumber(number) {
		const resolved = [];

		for (const key of Object.keys(Permissions.FLAGS)) {
			if (number & Permissions.FLAGS[key]) resolved.push(key);
		}

		return resolved;
	}

	compareStreaming(oldMember, newMember) {
		const s1 =
			oldMember.presence.activity &&
			oldMember.presence.activity.type === 'STREAMING';
		const s2 =
			newMember.presence.activity &&
			newMember.presence.activity.type === 'STREAMING';
		if (s1 === s2) return 0;
		if (s1) return 1;
		if (s2) return 2;
		return 0;
	}

	async fetchMember(guild, id, cache) {
		const user = await this.client.users.fetch(id, cache);
		return guild.members.fetch(user, cache);
	}

	embed(data) {
		return new MessageEmbed(data);
	}

	attachment(file, name) {
		return new MessageAttachment(file, name);
	}

	collection(iterable) {
		return new Collection(iterable);
	}
}

module.exports = SekaiUtil;
