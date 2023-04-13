export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":{"file":"_app/immutable/entry/start.5bd274cd.js","imports":["_app/immutable/entry/start.5bd274cd.js","_app/immutable/chunks/index.b2a16be1.js","_app/immutable/chunks/singletons.ed551491.js","_app/immutable/chunks/index.e1aac948.js"],"stylesheets":[],"fonts":[]},"app":{"file":"_app/immutable/entry/app.b9cbe2da.js","imports":["_app/immutable/entry/app.b9cbe2da.js","_app/immutable/chunks/index.b2a16be1.js"],"stylesheets":[],"fonts":[]}},
		nodes: [
			() => import('../output/server/nodes/0.js'),
			() => import('../output/server/nodes/1.js'),
			() => import('../output/server/nodes/2.js')
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 2 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
