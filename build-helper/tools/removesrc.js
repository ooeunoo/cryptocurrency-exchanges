/* eslint-disable */
const fs = require('fs')
const path = require('path')
/* eslint-enable */

const requiredModules = ['cjs', 'esm', 'types']

function deleteExceptEjsEsmTypes() {
  const distPath = './dist'

  // dist 폴더 내의 모든 항목 가져오기
  const distContents = fs.readdirSync(distPath)

  // ejs, esm, types 폴더를 제외한 모든 항목 삭제
  distContents.forEach((item) => {
    if (!requiredModules.includes(item)) {
      const itemPath = path.join(distPath, item)

      // 폴더인지 파일인지 확인
      const isDirectory = fs.statSync(itemPath).isDirectory()

      if (isDirectory) {
        // 폴더인 경우 재귀적으로 폴더 및 내부 항목 삭제
        deleteFolderRecursive(itemPath)
      } else {
        // 파일인 경우 삭제
        fs.unlinkSync(itemPath)
      }
    }
  })
}

// 재귀적으로 폴더 및 내부 항목 삭제 함수
function deleteFolderRecursive(folderPath) {
  if (fs.existsSync(folderPath)) {
    fs.readdirSync(folderPath).forEach((file) => {
      const curPath = path.join(folderPath, file)
      if (fs.lstatSync(curPath).isDirectory()) {
        // 폴더인 경우 재귀적으로 호출하여 폴더 내 항목 삭제
        deleteFolderRecursive(curPath)
      } else {
        // 파일인 경우 삭제
        fs.unlinkSync(curPath)
      }
    })
    // 폴더 내 항목이 모두 삭제된 후 폴더 삭제
    fs.rmdirSync(folderPath)
  }
}

// 함수 호출
deleteExceptEjsEsmTypes()
