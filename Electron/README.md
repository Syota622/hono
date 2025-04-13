# 初期設定
npm init -y
npm install --save-dev electron
npm start
package.jsonのscriptsに"start": "electron ."を追加
package.jsonのindex.jsをmain.jsに変更

# dmgファイル作成
npm install --save-dev electron-builder
npm run build
