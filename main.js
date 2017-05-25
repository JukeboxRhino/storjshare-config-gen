let mix = {
	methods: {
		configToJSON: function(arr) {
			let output = {};
			arr.forEach((item) => {
				output[item.key] = item.value;
			});
			return JSON.stringify(output, null, '\t');
		},
		downloadConfig: function() {

		}
	}
}

function init(){
	var app = new Vue({
		el: '#app',
		mixins: [mix],
		data: {
			config: [
				{
					key: 'paymentAddress',
					value: '',
					required: true,
					type: 'string',
					description: 'SJCX payment address. Will change to ethereum address in the near future, for now this is your counterparty wallet address.'
				},
				{
					key: 'opcodeSubscriptions',
					value: [
					'0f01020202',
					'0f02020202',
					'0f03020202'
					],
					required: true,
					type: 'array',
					description: 'Network protocol opcode subscriptions. Don\'t change these unless you know what you\'re doing.'
				},
				{
					key: 'maxOfferConcurrency',
					value: 3,
					required: true,
					type: 'number',
					description: 'Maximum outstanding offers to manage at one time. 3 is the reccommended value for desktops, however on low memory machines it is often necessary to lower it to 2 or 1 (Raspberry Pi users will want to set it to 1).'
				},
				{
					key: 'bridgeUri',
					value: 'https://api.storj.io',
					required: true,
					type: 'string',
					description: 'URI of the bridge provider. For now, Storj Labs provides the only bridge.'
				},
				{
					key: 'seedList',
					value: [],
					required: false,
					type: 'array',
					description: 'List of peers to connect to upon startup. Defaults to empty.'
				},
				{
					key: 'rpcAddress',
					value: '127.0.0.1',
					required: true,
					type: 'string',
					description: 'Public IP or hostname. This is what other nodes will try to connect to.'
				},
				{
					key: 'rpcPort',
					value: 47918,
					required: true,
					type: 'number',
					description: 'Public-facing port other nodes will try to connect to.'
				},
				{
					key: 'doNotTraverseNat',
					value: false,
					required: true,
					type: 'boolean',
					description: 'Set to true if you have port forwarding set up or you are otherwise reachable from the outside. Otherwise, leave as false.'
				},
				{
					key: 'joinRetry',
					value: {
						times: 3,
						interval: 5000
					},
					required: true,
					type: 'object',
				},
				{
					key: 'offerBackoffLimit',
					value: 4,
					required: true,
					type: 'number',
				},
				{
					key: 'networkPrivateKey',
					value: '',
					required: true,
					type: 'string',
					description: 'Your hex private key.'
				},
				{
					key: 'loggerVerbosity',
					value: 3,
					required: true,
					type: 'number',
					description: '4 - Debug | 3 - Info | 2 - Warn | 1 - Error | 0 - Silent',
					max: 4
				},
				{
					key: 'loggerOutputFile',
					value: 'FAKEPATH/.config/storjshare/logs/log.log',
					required: true,
					type: 'string',
					description: 'The path to the log file for your node.'
				},
				{
					key: 'storagePath',
					value: 'FAKEPATH/storage',
					required: true,
					type: 'string',
					description: 'The path to the folder where network data will be stored in.'
				},
				{
					key: 'storageAllocation',
					value: 1073741824,
					required: true,
					type: 'number',
					description: 'Storage allocation in bytes to make available for rent.'
				},
				{
					key: 'enableTelemetryReporting',
					value: true,
					required: true,
					type: 'boolean',
					description: 'Allows your client to send telemetry data to Storj Labs to improve Storj Share. You will receive compensation for leaving it enabled.'
				}
			]
		}
	});
}

window.onload = init;