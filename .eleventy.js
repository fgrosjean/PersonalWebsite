module.exports = function(eleventyConfig) {
	eleventyConfig.addWatchTarget("./_sass/")
	eleventyConfig.addWatchTarget("./_scripts/")
	eleventyConfig.addPassthroughCopy({"_assets" : "assets"})
	
	return {
		dir: { output: "docs" }
	}
}