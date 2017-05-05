const path = require('path')
const exiftool = process.env.LOCAL ? require('..') : require('node-exiftool')
const exiftoolBin = require('dist-exiftool')

const pathToFiles = path.join(process.cwd(), process.argv[2])

const exifdata = new exiftool.ExiftoolProcess(exiftoolBin)

exifdata.readMetadata(pathToFiles).then(console.log)

// function readMetadata(filepath, callback) {
//   exifdata.open().then((pid) => {
//     console.log('Started exiftool process %s', pid)
//     console.log('Path to file is ' + filepath)
//   }).then(() => {
//     exifdata.readMetadata(filepath, ['Creator', 'Keywords', 'Orientation'])
//   }).then((res) => {
//     if (typeof callback === 'function') callback(null, res)
//   }).catch((err) => {
//     if (typeof callback === 'function') callback(err)
//   }).then(() => exifdata.close()).then(() => console.log('Closed exiftool'))
// }
//
// readMetadata(pathToFiles, function myCallback(err, res) {
//   console.error(err)
//   console.log(res)
// })
