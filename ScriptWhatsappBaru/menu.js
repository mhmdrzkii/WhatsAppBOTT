const fs = require('fs')
const chalk = require('chalk')

function menu (pushname, prefix) {
    const m = (namaMenu) => `*${prefix}${namaMenu}*`
    const o = (namaMenu) => `${prefix}${namaMenu}`
    return `
Hai ${pushname}🌻

➣ *_Tolong jangan melakukan panggilan suara, karena akan ter blokir otomatis_* 📛

Berikut Adalah Menu yang tersedia
`
}
function menu1 (){
    return`
➢ untuk harga sale sekarang kita jual di harga 1000K / 1JT Untuk Akun Termasuk Ongkos Kirim Polosan
`
}
function menu3 (){
    let dt=new Date();
    //curent date
    let date=("0" + dt.getDate()).slice(-2);

    //curent month
    let month = ("0" + (dt.getMonth() + 1)).slice(-2);

    //curent year
    let year=dt.getFullYear();

    //curent hours
    let hours=dt.getHours();

    //curent Minutes
    let Minutes=dt.getMinutes();

    //curent seconds
    let seconds=dt.getSeconds();

    let teks= `*REALTIME UPDATE*  `;

    var output=teks + date + "/" + month + "/" + year + " " + hours + ":" + Minutes;
    return (output + `\n\n➢ *Stock Termasuk Ongkos Kirim* : 1 \n➢ *Stock Termasuk Ongkos Kirim Support Pembayaran PayLater* : 0`);

}
function menu4 (){
    return`
*SUDAH TIDAK OPEN PRE ORDER*`
}
function menu5 (){
    return`
➢ Untuk Bantuan Lebih Lanjut Silakan Hubungi Kami Dibawah Ini
Email : 𝙝𝙚𝙡𝙥@𝙧𝙮𝙯𝙨𝙩𝙤𝙧𝙚𝙚.𝙘𝙤𝙢
WhatsApp : +62 838-5005-5745
Silakan Hubungi CS untuk bantuan lain, Selamat Berbelanja ❤️
`
}
function menu6 (){
    return`
CHANNEL TELEGRAM

➢ https://t.me/ryzstoree_tlgrm

BOT TELEGRAM
➢ https://t.me/ryzstoreeid_bot
`
}
function menu7 (){
    return`
Hallo, kami butuh dukungan kalian agar BOT ini tetap aktif.

*Donasi kalian digunakan untuk biaya server BOT ini agar tetap aktif dan dapat kalian gunakan.*

Donasi disini : https://saweria.co/rzkiyy

Berapapun nominalnya akan sangat membantu pengembangan bot ini.

Terimakasih.

`
}
function menu8 (){
    return`
Terms and Condition

Dengan menggunakan bot ini maka anda *setuju* dengan syarat dan kondisi sebagai berikut:
- *Berilah jeda dari setiap perintah.*
- Dilarang menelfon bot, atau kalian akan kena block otomatis.
- Dilarang keras melakukan spam.
- Bot tidak menyimpan gambar/media yang dikirimkan.
- Bot tidak menyimpan data pribadi anda di server kami.
- Bot tidak bertanggung jawab atas perintah anda kepada bot ini.
- Bot berjalan di server secara terpisah.

Terima kasih.
    
`
}
function menu9 (){
    return`
Halo, Jika kamu sudah melakukan Pemilihan Items yang telah kami sediakan melalui Button Message, maka selanjutkan kamu hanya perlu menunggu hingga admin kami membalas chat anda secara langsung, bukan *BOT*

Setelah itu kita akan melakukan konfirmasi ulang dan kamu akan diarahkan untuk transfer sesuai dengan pricelist yang telah kami tentukan

Kami hanya menggunakan satu rekening untuk bertransaksi | 𝘽𝘾𝘼 𝘼/𝙉 𝙈𝙐𝙃𝘼𝙈𝘼𝘿 𝙍𝙄𝙕𝙆𝙔 295****156 Selain Itu Bisa Dipastikan PENIPUAN!

Mohon Untuk Berbicara Dengan Sopan Dan Hindari Kata Kata Yang Menyinggung

Selamat Berbelanja ❤️
    
`
}
function menu23 (prefix) {
    const m = (namaMenu) => `*${prefix}${namaMenu}*`
    const o = (namaMenu) => `${prefix}${namaMenu}`
    return `
*FITUR LAINNYA*

${m('Hidetag')} : Hiden tag seluruh user di grup
⤿ ${o('hidetag')} Hai beban 👋

${m('Ephemeral')}: Opsi untuk pesan sementara
⤿ ${o('ephemeral')} On/Off

${m('Setppgc')} : Set profile picture group chat
⤿ Kirim atau balas gambar dengan caption ${o('setppgc')}

${m('Setname')} : Merubah nama group chat
⤿ ${o('setname')} Grup WhatsApp

${m('Setdesc')} : Merubah deskripsi group chat
⤿ ${o('setdesc')} Grup ini merupakan ajang pansos

${m('Editinfo')} : Merubah akses edit info group
⤿ ${o('editinfo')} Lock/Unlock

${m('Add')} : Menambahkan user ke dalam grup
⤿ ${o('add')} @tag / nomor target dimulai dari 62 (kode negara)

${m('Kick')} : Mengeluarkan user dari grup
⤿ ${o('kick')} @tag user yang akan di keluarkan

${m('Promote')} : Menambahkan user sebagai admin grup
⤿ ${o('promote')} @tag user yang akan dijadikan admin

${m('Demote')} : Menurunkan jabatan admin menjadi user biasa
⤿ ${o('demote')} @tag admin yang akan di demote`

}
module.exports = {
    menu,
    menu23,
    menu1,
    menu3,
    menu4,
    menu5,
    menu6,
    menu7,
    menu8,
    menu9,
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
})