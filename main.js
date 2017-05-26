//Generate a new storj keypair on every page load so users can download a working config
const storj = new Storj();
const keypair = storj.generateKeyPair();
const privateKey = keypair.getPrivateKey();

let mix = {
	methods: {
		configToJSON: function(arr) {
			let output = {};
			arr.forEach((item) => {
				if(item.required || item.enabled)
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
					title: 'Payment Address',
					value: '',
					required: true,
					type: 'string',
					description: 'SJCX payment address. Will change to ethereum address in the near future, for now this is your counterparty wallet address.'
				},
				{
					key: 'opcodeSubscriptions',
					title: 'Opcode Subscriptions',
					value: [
					'0f01020202',
					'0f02020202',
					'0f03020202'
					],
					required: true,
					type: 'array',
					description: 'Network protocol opcode subscriptions. Don\'t change these unless you know what you\'re doing. <a href="https://storj.github.io/core/tutorial-contract-topics.html">More info available here</a>'
				},
				{
					key: 'maxOfferConcurrency',
					title: 'Maximum Offer Concurrency',
					value: 3,
					required: true,
					type: 'number',
					description: 'Maximum outstanding offers to manage at one time. 3 is the reccommended value for desktops, however on low memory machines it is often necessary to lower it to 2 or 1 (Raspberry Pi users will want to set it to 1).'
				},
				{
					key: 'bridgeUri',
					title: 'Bridge URI',
					value: 'https://api.storj.io',
					required: true,
					type: 'string',
					description: 'URI of the bridge provider. For now, Storj Labs provides the only bridge.'
				},
				{
					key: 'seedList',
					title: 'Seed List',
					value: [],
					required: false,
					type: 'array',
					description: 'List of peer URIs to connect to upon startup, in the form <code>storj://[ip.or.hostname]:[port]/[nodeid]</code>. Defaults to empty.'
				},
				{
					key: 'rpcAddress',
					title: 'RPC Address',
					value: '127.0.0.1',
					required: true,
					type: 'string',
					description: 'Public IP or hostname. This is what other nodes will try to connect to.'
				},
				{
					key: 'rpcPort',
					title: 'RPC Port',
					value: 47918,
					required: true,
					type: 'number',
					description: 'Public-facing port other nodes will try to connect to.'
				},
				{
					key: 'doNotTraverseNat',
					title: 'Do Not Traverse Nat',
					value: false,
					required: true,
					type: 'boolean',
					description: 'Set to true if you have port forwarding set up or you are otherwise reachable from the outside. Otherwise, leave as false.'
				},
				{
					key: 'maxConnections',
					title: 'Max Connections',
					value: 150,
					required: true,
					type: 'number',
					description: 'Maximum number of concurrent connections to allow'
				},
				{
					key: 'maxTunnels',
					title: 'Max Tunnels',
					value: 3,
					required: true,
					type: 'number',
				},
				{
					key: 'tunnelGatewayRange',
					title: 'Tunnel Gateway Range',
					value: {
						min: 4001,
						max: 4003
					},
					required: true,
					type: 'object',
					description: 'Starting and ending port range for tunnels to provide'
				},
				{
					key: 'joinRetry',
					title: 'Join Retry',
					value: {
						times: 3,
						interval: 5000
					},
					required: true,
					type: 'object',
				},
				{
					key: 'offerBackoffLimit',
					title: 'Offer Backoff Limit',
					value: 4,
					required: true,
					type: 'number',
					description: 'Does not send offers if more than N transfers are active'
				},
				{
					key: 'networkPrivateKey',
					title: 'Network Private Key',
					value: privateKey,
					required: true,
					type: 'string',
					description: 'Your hex private key.'
				},
				{
					key: 'loggerVerbosity',
					title: 'Logger Verbosity',
					value: 3,
					required: true,
					type: 'number',
					description: '4 - Debug | 3 - Info | 2 - Warn | 1 - Error | 0 - Silent',
					max: 4
				},
				{
					key: 'loggerOutputFile',
					title: 'Logger Output File',
					value: '',
					required: true,
					type: 'string',
					description: 'The path to the log file for your node. If empty defaults to <code>$HOME/.config/storjshare/logs/[nodeid].log</code>'
				},
				{
					key: 'storagePath',
					title: 'Storage Path',
					value: 'FAKEPATH/storage',
					required: true,
					type: 'string',
					description: 'The path to the folder where network data will be stored in.'
				},
				{
					key: 'storageAllocation',
					title: 'Storage Allocation',
					value: '10GB',
					required: true,
					type: 'number',
					description: 'Storage allocation in bytes to make available for rent. Valid units are B, KB, MB, GB, TB'
				},
				{
					key: 'enableTelemetryReporting',
					title: 'Enable Telemetry Reporting',
					value: true,
					required: true,
					type: 'boolean',
					description: 'Allows your client to send telemetry data to Storj Labs to improve Storj Share. You will receive compensation for leaving it enabled.'
				},
				{
					key: 'renterWhitelist',
					title: 'Renter Whitelist',
					value: [],
					required: false,
					type: 'array',
				}
			]
		}
	});
}

window.onload = init;