import fs from 'fs'
import path from 'path'

const scandir = (dir, searchRegexp, ignoreRegexp, done) => {
  let resultList = []
  fs.readdir(dir, (err, list) => {
    if(err) {
      return done(err)
    }
    let pending = list.length
    if(!pending) {
      return done(null, resultList)
    }
    list.forEach((file) => {
      file = path.resolve(dir, file)
      fs.stat(file, (err, stat) => {
        if(stat && stat.isDirectory()) {
          scandir(file, searchRegexp, ignoreRegexp, (err, res) => {
            resultList = resultList.concat(res)
            if(!--pending) {
              done(null, resultList)
            }
          })
        } else if(! ignoreRegexp.test(file) && searchRegexp.test(file)) {
          resultList.push(file)
          if(!--pending) {
            done(null, resultList)
          }
        } else {
          // not a .js file
          if(!--pending) {
            done(null, resultList)
          }
        }
      })
    })
  })
}

const main = () => {
  const searchRegexp = /.js$/
  const ignoreRegexp = /\/node_modules\//
  scandir('./', searchRegexp, ignoreRegexp, (err, result) => { 
    console.log({ err, result })
  })
  /*
  const fileNameList = fs.readdirSync('./', { withFileTypes: false, });
  const fileDirEntList = fs.readdirSync('./', { withFileTypes: true, })
  console.log({ fileNameList, fileDirEntList })
  */
}

main()

