let patchnote = require("../warframejsondata/patchnotes.json")

//add from the oldest data
const reverseAdd = dataPatchnote => {
	//add createdAt & updatedAt for postgres database requirement
	dataPatchnote.forEach(data => {
		data, (data.createdAt = data.updatedAt = new Date())
	})

	//reverse the data from the oldest (so we can read the id easier)
	const reversePatchnote = []
	for (let index = dataPatchnote.length; index > 0; index--) {
		reversePatchnote.push(dataPatchnote[index])
	}
	return reversePatchnote
}

patchnote = reverseAdd(patchnote)
