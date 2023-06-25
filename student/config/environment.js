const environment = {
	// 开发环境配置
	development: {
		baseURL: 'http://localhost:8080/api/',
	},
	// 生产环境配置
	production: {
		baseURL: 'http://localhost:8080'
	}
}

module.exports = {
  environment: environment[process.env.NODE_ENV]
}