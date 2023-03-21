require('./config')
const { BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, proto, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, areJidsSameUser, getContentType } = require('@adiwajshing/baileys')
const fs = require('fs')
const util = require('util')
const chalk = require('chalk')
const { exec, spawn, execSync } = require("child_process")
const axios = require('axios')
const os = require('os')
const moment = require('moment-timezone')
const speed = require('performance-now')
const { performance } = require('perf_hooks')
const { smsg, formatp, tanggal, formatDate, getTime, isUrl, sleep, clockString, runtime, fetchJson, getBuffer, jsonformat, format, parseMention, getRandom, getGroupAdmins } = require('./lib/myfunc')
const { send } = require('process')

let vote = db.data.others.pilih = []

module.exports = iluser = async (client, m, chatUpdate, store) => {
    try {
        var body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ''
        var budy = (typeof m.text == 'string' ? m.text : '')
        var prefix = prefa ? /^[\\/!#.]/gi.test(body) ? body.match(/^[\\/!#.]/gi)[0] : "" : prefa ?? global.prefix
        const isCmd = body.startsWith(prefix)
        const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
        const args = body.trim().split(/ +/).slice(1)
        const pushname = m.pushName || "No Name"
        const botNumber = await client.decodeJid(client.user.id)
        const isCreator = [botNumber, ...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
        const itsMe = m.sender == botNumber ? true : false
        const text = q = args.join(" ")
        const arg = budy.trim().substring(budy.indexOf(' ') + 1 )
        const arg1 = arg.trim().substring(arg.indexOf(' ') + 1 )
        const quoted = m.quoted ? m.quoted : m
        const mime = (quoted.msg || quoted).mimetype || ''
        const isMedia = /image|video|sticker|audio/.test(mime)
        const from = m.chat
        const reply = m.reply
        const mek = chatUpdate.messages[0]
	
        // Group
        const groupMetadata = m.isGroup ? await client.groupMetadata(m.chat).catch(e => {}) : ''
        const groupName = m.isGroup ? groupMetadata.subject : ''
        const participants = m.isGroup ? await groupMetadata.participants : ''
        const groupAdmins = m.isGroup ? await getGroupAdmins(participants) : ''
    	const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false
    	const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
        
        mess = {
            success: '✓ Success',
            admin: '*AKSES DITOLAK*⛔ \n\nFitur Khusus Admin Group!',
            botAdmin: ' *GAGAL*⛔ \n\nBot Harus Menjadi Admin Terlebih Dahulu!',
            owner: '*AKSES DITOLAK*⛔ \n\nFitur Khusus Owner Bot Atau Premium USER',
            group: '⛔ *AKSES DITOLAK* \n\nPerintah ini dapat dipakai didalam group!',
            private: 'Fitur Digunakan Hanya Untuk Private Chat!',
            bot: 'Fitur Khusus Pengguna Nomor Bot',
            wait: `Sabar ya ${pushname} lagi loading, mungkin memerlukan beberapa waktu...`,
            endLimit: 'Limit Harian Anda Telah Habis, Limit Akan Direset Setiap Jam 12',
        }

        //function sending media
        const sendFFU = async (from, url, caption = '', mek, men) => {
            if (!caption) caption = 'udah nih mendokusei'
            if (!url) return await reply('Data media tidak ditemukan.')
            let mime = '';
            let res = await axios.head(url)
            mime = res.headers['content-type']
            if (mime.split("/")[1] === "gif") {
                return client.sendMessage(from, { video: await convertGif(url), caption: caption, gifPlayback: true, mentions: men ? men : []}, {quoted: mek}).catch(e => { return reply(e) })
                }
            let type = mime.split("/")[0]+"Message"
            if(mime.split("/")[0] === "image"){
                return client.sendMessage(from, { image: await getBuffer(url), caption: caption, mentions: men ? men : []}, {quoted: mek}).catch(e => { return reply(e) })
            } else if(mime.split("/")[0] === "video"){
                return client.sendMessage(from, { video: await getBuffer(url), caption: caption, mentions: men ? men : []}, {quoted: mek}).catch(e => { return reply(e) })
            } else if(mime.split("/")[0] === "audio"){
                return client.sendMessage(from, { audio: await getBuffer(url), caption: caption, mentions: men ? men : [], mimetype: 'audio/mpeg'}, {quoted: mek }).catch(e => { return reply(e) })
            } else {
                return client.sendMessage(from, { document: await getBuffer(url), mimetype: mime, fileName: caption, mentions: men ? men : []}, {quoted: mek }).catch(e => { return reply(e) })
            } 
        }
	    
        // Public & Self
        if (!client.public) {
            if (!m.key.fromMe) return
        }

        // Push Message To Console
        let argsLog = (budy.length > 30) ? `${q.substring(0, 30)}...` : budy

        // Push Message To Console && Auto Read
        if (m.message) {
            client.sendReadReceipt(m.chat, m.sender, [m.key.id])
            console.log(chalk.black(chalk.bgWhite('[ LOGS ]')), color(`${argsLog}`, 'turquoise') + ' ' + chalk.magenta('From'), chalk.green(pushname) + ' ' + chalk.blueBright('In'), chalk.green(m.isGroup ? pushname : pushname, groupName))
        }
	    async function sendListMessage(jid, sections, quoted) {
            const listMessage = {
                text: `Silakan pilih menu dibawah ini yaa!`,
                title:`Halo *_${pushname}_ 🐣*`,
                buttonText: "Menu",
                sections
                };
                return await client.sendMessage(jid, listMessage, { quoted })
        }
	    if (isCmd) {
            switch(command) {
                // Pemanggilan fungsi menu
                case 'menu':{
                    let { menu } = require('./menu')
                    let menuh = await menu(pushname, prefix)
                    try {
                        prof = await client.profilePictureUrl(sender, 'image')
                    } catch {
                        prof = global.thumb
                    }
                    let btn = [ {
                            urlButton: {
                                displayText: 'Telegram Channel',
                                url: 'https://t.me/ryzstoree_tlgrm'
                            }
                        }, {
                            urlButton: {
                                displayText: 'Telegram BOT',
                                url: 'https://t.me/ryzstoreeid_bot'
                            }
                        }, {
                            quickReplyButton: {
                                displayText: 'Status Bot',
                                id: prefix+'ping'
                            }
                        }, {
                            quickReplyButton: {
                                displayText: 'Contact Owner',
                                id: prefix+'owner'
                            }  
                        }]

                    const sections = [{
                        title: "WAJIB DIBACA",
                        rows: [
                            { title: "Terms and condition", rowId: prefix +"menu8", description: "Baca dan pahami sebelum menggunakan" }
                        ]
                    }, {
                        title: "Shopee Termasuk Ongkos Kirim",
                        rows: [
                            { title: "Informasi Produk Beserta Harga", rowId: prefix +"menu2", description: "Variasi Harga Beserta Items Shopee" },
                            { title: "Stock Akun", rowId: prefix +"menu3", description: "Mengecek stok yang tersedia" },
                            { title: "Pre Order", rowId: prefix +"menu4", description: "Informasi Pemesanan  Pre Order " },
                            { title: "Informasi Pembayaran", rowId: prefix +"menu9", description: "Silakan Dibaca Sebelum melakukan pembelian Produk" },
                        ]
                    },{
                       title: "Apps Premium",
                       rows: [
                        { title: "Netflix", rowId: prefix +"menu10", description: "memunculkan harga dari produk Netlfix"},
                        { title: "Disney Plus Hotstar", rowId: prefix +"menu11", description: "memunculkan harga dari produk Disney+"},
                        { title: "Spotify", rowId: prefix +"menu12", description: "memunculkan harga dari produk Spotify"},
                        { title: "Vidio", rowId: prefix +"menu13", description: "memunculkan harga dari produk Vidio"},
                        { title: "Get Contact Profesional", rowId: prefix +"menu14", description: "memunculkan harga dari produk Get Contact"},
                        { title: "Youtube Premium", rowId: prefix +"menu15", description: "memunculkan harga dari produk Youtube"},
                       ] 
                    },{
                        title: "Azure Remote Dekstop Protocol",
                        rows: [
                            { title: "Mini Package 1", rowId: prefix +"menu24", description: "RDP Dengan Spesifikasi 1GB RAM & 1vCPU"},
                            { title: "Mini Package 2", rowId: prefix +"menu25", description: "RDP Dengan Spesifikasi 4GB RAM & 2vCPU"},
                            { title: "Premium Package 1", rowId: prefix +"menu26", description: "RDP Dengan Spesifikasi 8GB RAM & 2vCPU"},
                            { title: "Premium Package 2", rowId: prefix +"menu27", description: "RDP Dengan Spesifikasi 16GB RAM & 4vCPU"},
                            { title: "Super Premium Package", rowId: prefix +"menu28", description: "RDP Dengan Spesifikasi 32GB RAM & 8vCPU"},

                        ]
                    }, {
                        title: "LAYANAN BANTUAN",
                        rows: [
                            { title: "Bantuan", rowId: prefix +"menu5", description: "Customer Support" },
                            { title: "Channel Telegram", rowId: prefix +"menu6", description: "Channel Telegram Kami" },
                            { title: "Live Chat", rowId: prefix +"livechat", description: "Untuk menghubungi CS" },
                        ]
                    }]
                    await client.send5ButImg(m.chat, menuh, `Reegards - RYZSTORE`, prof, btn)
                    await sendListMessage(from, sections, m)
                }

                // bagian sub menu
                break
                case 'menu0':{
                    let {menu0} = require('./menu')
                    let menuh = menu0(prefix)
                    await reply(menuh)
                }
                break
                case 'menu1':{
                    let {menu1} = require('./menu')
                    let menuh = menu1(prefix)
                    await reply(menuh)
                }
                break
                case 'menu2':{
                    vote[m.chat] = [q, [], [], []]
                    await sleep(1000)
                    shopeepolos = vote[m.chat][1]
                    shopeespl = vote[m.chat][2]
                    shopeesplhrg = vote[m.chat][3]
                    await client.sendMessage(m.chat, { image: { url: `./src/logo/spl1.png`}, caption: `Halo, Silakan dibuka untuk melihat daftar produk `}, { quoted: m })
                    let text = `Ingin melakukan pembelian? klik opsi dibawah ini`
                    let buttons = [
                        {
                            buttonId: prefix+`shopeepolos`, buttonText: {displayText: 'Termasuk Ongkos Kirim Polosan'}, type: 1
                        },
                        {
                            buttonId: prefix+`shopeespl`, buttonText: {displayText: 'Termasuk Ongkos Kirim + SPL'}, type: 1
                        },
                        {
                            buttonId: prefix+`shopeesplhrg`, buttonText: {displayText: 'Informasi Harga Termasuk Ongkos Kirim + SPL'}, type: 1
                        }
                    ]
                    let buttonMessage = {
                        text: text,
                        footer: 'RYZSTORE',
                        buttons: buttons,
                        headerType: 2,
                    }
                    await client.sendMessage(m.chat, buttonMessage)
                }
                break
                case 'menu3':{
                    let {menu3} = require('./menu')
                    let menuh = menu3(prefix)
                    await reply(menuh)
                    vote[m.chat] = [q, [], []]
                    await sleep(1000)
                    shopeepolos = vote[m.chat][1]
                    shopeespl = vote[m.chat][2]
                    shopeesplhrg = vote[m.chat][3]
                    let text = `_Memunculkan Items Shopee_`
                    let buttons = [
                        {
                            buttonId: prefix+`shopeepolos`, buttonText: {displayText: 'Termasuk Ongkos Kirim Polosan'}, type: 1
                        },
                        {
                            buttonId: prefix+`shopeespl`, buttonText: {displayText: 'Termasuk Ongkos Kirim + SPL'}, type: 1
                        },
                        {
                            buttonId: prefix+`shopeesplhrg`, buttonText: {displayText: 'Informasi Harga Termasuk Ongkos Kirim + SPL'}, type: 1
                        }
                    ]
                    let buttonMessage = {
                        text: text,
                        footer: 'RYZSTORE',
                        buttons: buttons,
                        headerType: 2,
                    }
                    await client.sendMessage(m.chat, buttonMessage)
                }
                break
                case 'menu4':{
                    let {menu4} = require('./menu')
                    let menuh = menu4(prefix)
                    await reply(menuh)
                }
                break
                case 'menu5':{
                    let {menu5} = require('./menu')
                    let menuh = menu5(prefix)
                    await reply(menuh)
                }
                break
                case 'menu6':{
                    let {menu6} = require('./menu')
                    let menuh = menu6(prefix)
                    await reply(menuh)
                }
                break
                case 'menu7':{
                    let {menu7} = require('./menu')
                    let menuh = menu7(prefix)
                    await reply(menuh)
                }
                break
                case 'menu8':{
                    let {menu8} = require('./menu')
                    let menuh = menu8(prefix)
                    await reply(menuh)
                }
                break
                case 'menu9':{
                    let {menu9} = require('./menu')
                    let menuh = menu9(prefix)
                    await reply(menuh)
                }
                break
                case 'menu10':{
                    vote[m.chat] = [q, [], []]
                    await sleep(1000)
                    netflixpriv = vote[m.chat][1]
                    netflixshared = vote[m.chat][2]
                    await client.sendMessage(m.chat, { image: { url: `./src/logo/netflix.png`}, caption: `Halo, Silakan dibuka untuk melihat harga`}, { quoted: m })
                    let text = `Untuk melanjutkan pesanan silakan pilih opsi dibawah ini ya`
                    let buttons = [
                        {
                            buttonId: prefix+`netflixpriv`, buttonText: {displayText: 'Netflix Private'}, type: 1
                        },
                        {
                            buttonId: prefix+`netflixshared`, buttonText: {displayText: 'Netflix Shared'}, type: 1
                        }
                    ]
                    let buttonMessage = {
                        text: text,
                        footer: 'RYZSTORE',
                        buttons: buttons,
                        headerType: 2,
                    }
                    await client.sendMessage(m.chat, buttonMessage)
                }
                break
                case 'menu11':{
                    vote[m.chat] = [q, [], []]
                    await sleep(1000)
                    disneypriv = vote[m.chat][1]
                    disneyshared = vote[m.chat][2]
                    client.sendMessage(m.chat, { image: { url: `./src/logo/disney.png`}, caption: `Halo silakan dibuka untuk melihat harga`}, { quoted: m })
                    await sleep(1000)
                    let text = `Untuk melanjutkan pesanan silakan pilih opsi dibawah ini ya`
                    let buttons = [
                        {
                            buttonId: prefix+`disneypriv`, buttonText: {displayText: 'Disney+ Private'}, type: 1
                        },
                        {
                            buttonId: prefix+`disneyshared`, buttonText: {displayText: 'Disney+ Shared'}, type: 1
                        }
                    ]
                    let buttonMessage = {
                        text: text,
                        footer: 'RYZSTORE',
                        buttons: buttons,
                        headerType: 2,
                    }
                    await client.sendMessage(m.chat, buttonMessage)
                }
                break
                case 'menu12':{
                    vote[m.chat] = [q, [], []]
                    await sleep(1000)
                    spotifymini = vote[m.chat][1]
                    spotifyadmin = vote[m.chat][2]
                    spotifyindividu = vote[m.chat][3]
                    client.sendMessage(m.chat, { image: { url: `./src/logo/spotify.png`}, caption: `Halo silakan dibuka untuk melihat harga`}, { quoted: m })
                    await sleep(1000)
                    let text = `Untuk melanjutkan pesanan silakan pilih opsi dibawah ini ya`
                    let buttons = [
                        {
                            buttonId: prefix+`spotifymini`, buttonText: {displayText: 'Spotify Mini'}, type: 1
                        },
                        {
                            buttonId: prefix+`spotifyadmin`, buttonText: {displayText: 'Spotify Admin'}, type: 1
                        },
                        {
                            buttonId: prefix+`spotifyindividu`, buttonText: {displayText: 'Spotify Individu'}, type: 1
                        }
                    ]
                    let buttonMessage = {
                        text: text,
                        footer: 'RYZSTORE',
                        buttons: buttons,
                        headerType: 2,
                    }
                    await client.sendMessage(m.chat, buttonMessage)
                }
                break
                case 'menu13':{
                    vote[m.chat] = [q, [], []]
                    await sleep(1000)
                    vidioplatinumprv = vote[m.chat][1]
                    vidioplatinumshrd = vote[m.chat][2]
                    client.sendMessage(m.chat, { image: { url: `./src/logo/vidio.png`}, caption: `Halo silakan dibuka untuk melihat harga`}, { quoted: m })
                    await sleep(1000)
                    let text = `Untuk melanjutkan pesanan silakan pilih opsi dibawah ini ya`
                    let buttons = [
                        {
                            buttonId: prefix+`vidioplatinumprv`, buttonText: {displayText: 'Platinum Private'}, type: 1
                        },
                        {
                            buttonId: prefix+`vidioplatinumshrd`, buttonText: {displayText: 'Platinum Shared'}, type: 1
                        }
                    ]
                    let buttonMessage = {
                        text: text,
                        footer: 'RYZSTORE',
                        buttons: buttons,
                        headerType: 2,
                    }
                    await client.sendMessage(m.chat, buttonMessage) 
                }
                break
                case 'menu14':{
                    vote[m.chat] = [q, [], []]
                    await sleep(1000)
                    gtc1 = vote[m.chat][1]
                    gtc6 = vote[m.chat][2]
                    client.sendMessage(m.chat, { image: { url: `./src/logo/getcontact.png`}, caption: `Halo silakan dibuka untuk melihat harga`}, { quoted: m })
                    await sleep(1000)
                    let text = `Untuk melanjutkan pesanan silakan pilih opsi dibawah ini ya`
                    let buttons = [
                        {
                            buttonId: prefix+`gtc1`, buttonText: {displayText: 'Profesional 1 Month'}, type: 1
                        },
                        {
                            buttonId: prefix+`gtc6`, buttonText: {displayText: 'Profesional 6 Month'}, type: 1
                        }
                    ]
                    let buttonMessage = {
                        text: text,
                        footer: 'RYZSTORE',
                        buttons: buttons,
                        headerType: 2,
                    }
                    await client.sendMessage(m.chat, buttonMessage) 
                }
                break
                case 'menu15':{
                    vote[m.chat] = [q, [], []]
                    await sleep(1000)
                    yt1 = vote[m.chat][1]
                    yt4 = vote[m.chat][2]
                    client.sendMessage(m.chat, { image: { url: `./src/logo/youtube.png`}, caption: `Halo silakan dibuka untuk melihat harga`}, { quoted: m })
                    await sleep(1000)
                    let text = `Untuk melanjutkan pesanan silakan pilih opsi dibawah ini ya`
                    let buttons = [
                        {
                            buttonId: prefix+`yt1`, buttonText: {displayText: 'Invite 1 Month'}, type: 1
                        },
                        {
                            buttonId: prefix+`yt4`, buttonText: {displayText: 'Admin 4 Month'}, type: 1
                        }
                    ]
                    let buttonMessage = {
                        text: text,
                        footer: 'RYZSTORE',
                        buttons: buttons,
                        headerType: 2,
                    }
                    await client.sendMessage(m.chat, buttonMessage)
                }
                break
                case 'menu16':{
                    if (!text) throw 'Reply dengan \n\njoin *linkgrup*!'
                    if (!isUrl(args[0]) && !args[0].includes('whatsapp.com')) throw 'Link Invalid!'
                    m.reply(mess.wait)
                    let result = args[0].split('https://chat.whatsapp.com/')[1]
                    await client.groupAcceptInvite(result).then((res) => m.reply("*Berhasil Masuk* \n\nJika ingin melihat fitur didalam bot silakan ketik ' grupmsg ' \nTanpa tanda petik \n\nBOT HARUS  MENJADI ADMIN!")).catch((err) => m.reply("*TIDAK DAPAT BERGABUNG* \n\nAlasan : Telah Di Keluarkan Dari grup")).catch
                }
                break
                case 'menu17':{
                    if (!m.isGroup) throw mess.group
                    if (!isBotAdmins) throw mess.botAdmin
                    if (!isAdmins) throw mess.admin
                    let teks = `${q ? q : 'dipanggil ketua dek'}\n\n`
                        for (let mem of participants) {
                            teks += `• @${mem.id.split('@')[0]}\n`
                        }
                        client.sendMessage(m.chat, { text: teks, mentions: participants.map(a => a.id) }, { quoted: m })
                }
                break
                case 'menu18': {
                    
                    let id = args && /\d+\-\d+@g.us/.test(args[0]) ? args[0] : m.chat
                    let online = [...Object.keys(store.presences[id]), botNumber]
                    client.sendText(m.chat, 'List Online:\n\n' + online.map(v => '⭔ @' + v.replace(/@.+/, '')).join`\n`, m, { mentions: online })

                }
                breakk
                case 'menu19':{
                    if (!m.isGroup) throw mess.group
                    if (!m.quoted) m.reply('Reply Pesan')
                    let msg = await m.getQuotedObj()
                    if (!m.quoted.isBaileys) throw 'Pesan tersebut bukan dikirim oleh bot!'
                    let teks = ''
                    for (let i of msg.userReceipt) {
                        let read = i.readTimestamp
                        let unread = i.receiptTimestamp
                        let waktu = read ? read : unread
                        teks += `⭔ @${i.userJid.split('@')[0]}\n`
                        teks += ` ┗━⭔ *Waktu :* ${moment(waktu * 1000).format('DD/MM/YY HH:mm:ss')} ⭔ *Status :* ${read ? 'Dibaca' : 'Terkirim'}\n\n`
                    }
                    client.sendTextWithMentions(m.chat, teks, m)
                }
                break
                case 'menu20':{
                    if (!m.isGroup) throw mess.group
                    if (!isBotAdmins) throw mess.botAdmin
                    let response = await client.groupInviteCode(m.chat)
                    client.sendText(m.chat, `https://chat.whatsapp.com/${response}\n\nLink Group : ${groupMetadata.subject}`, m, { detectLink: true })
                }
                break
                case 'menu21':{
                    if (!m.isGroup) throw mess.group
                    if (!isCreator) throw mess.owner
                    if (!isAdmins) throw mess.admin
                    await client.groupLeave(m.chat).then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
                }
                break
                case 'menu22':{
                    if (!m.isGroup) throw mess.group
                    if (!isBotAdmins) throw mess.botAdmin
                    if (!isAdmins) throw mess.admin
                    if (args[0] === 'unlock'){
                        await client.groupSettingUpdate(m.chat, 'announcement').then((res) => m.reply(`Sukses Menutup Group`)).catch((err) => console.log('Terjadi kesalahan'))
                    } else if (args[0] === 'lock'){
                        await client.groupSettingUpdate(m.chat, 'not_announcement').then((res) => m.reply(`Sukses Membuka Group`)).catch((err) => console.log('Terjadi kesalahan'))
                    } else {
                        let buttons = [
                            { buttonId: 'group unlock', buttonText: { displayText: 'Tutup akses Grup' }, type: 1 },
                            { buttonId: 'group lock', buttonText: { displayText: 'Buka akses grup' }, type: 1 }
                        ]
                        await client.sendButtonText(m.chat, buttons, `Mode Group`, client.user.name, m)
                    }
                }
                break
                case 'menu23':{
                    let {menu23} = require('./menu')
                    let menuh = menu23(prefix)
                    await reply(menuh)
                }
                case 'grupmsg':{
                    if (!m.isGroup) throw mess.group
                    let { menu } = require('./menu')
                    let menuh = await menu(pushname, prefix)
                    try {
                        prof = await client.profilePictureUrl(sender, 'image')
                    } catch {
                        prof = global.thumb
                    }

                    const sections = [{
                        title: "FITUR GRUP",
                        rows: [
                            { title: "Join", rowId: prefix +"menu16", description: "Join grup dengan invite link" },
                            { title: "Tag all", rowId: prefix +"menu17", description: "Tag seluruh member" },
                            { title: "List Online", rowId: prefix+"menu18", description: "Tag seluruh member online" },
                            { title: "Readers", rowId: prefix+"menu19", description: "Mengetahui siapa yang sudah membaca pesan terbaru" },
                            { title: "Generate Link Group", rowId: prefix+"menu20", description: "Membuat Link Grup" },
                            { title: "Leave", rowId: prefix+"menu21", description: "Bot meninggalkan group" },
                            { title: "Group Set", rowId: prefix+"menu22", description: "Menutup atau membuka grup"},
                            { title: "Other Commands", rowId: prefix+"menu23", description: "Fitur atau perintah lainnya"}
                        ]
                        
                    }]
                    await sendListMessage(from, sections, m)
                }
                break
                case 'menu24':{
                    client.sendMessage(m.chat, { image: { url: `./src/logo/terms.png`}, caption: `silakan dibuka untuk melihat *_terms of service_*`}, { quoted: m })
                    await sleep(3000)
                    let teks = `*FORM PEMESANAN* \n\nUsername & Password : \nOS : \nRegion : \nTipe Paket : *1GB RAM 1vCPU* \n\nPrice : _Rp. 18.500,-_`
                    client.sendMessage(m.chat, { text: teks, })
                }
                    await sleep(3000)
                    {let teks = `*PERLU DIKETAHUI* \n\n1. Setelah Melakukan Pengisian Form Yang Sudah Diberikan Dan Mengirimkannya Ke WhatsApp Kami Silakan Klik Tombol SELESAI \n\n2.Jika Kamu Tidak Menekan Tombol Tsb Kemungkinan Besar Orderan Kamu Akan Lama Terbaca Oleh Admin \n\n3. Setelah Admin Kami Merespon, Kami Akan Melakukan Pengecekan Ketersediaan Stock Sesuai Permintaan Kamu \n\n4. Jika Stock Sudah Dapat Dikonfirmasi Maka Kemudian Kamu Akan Diminta Transfer Sesuai Dengan Harga Nominal Yang Tertera \n\nTerimakasih`
                    client.sendMessage(m.chat, { text: teks, })
                    await sleep(5000)
                     let text = `Untuk menyelesaikan pesanan silakan pilih opsi dibawah ini ya`
                    let buttons = [
                        {
                            buttonId: prefix+`ram1`, buttonText: {displayText: 'SELESAI'}, type: 1
                        }
                    ]
                    let buttonMessage = {
                        text: text,
                        footer: 'RYZSTORE',
                        buttons: buttons,
                        headerType: 2,
                    }
                    await client.sendMessage(m.chat, buttonMessage)
                }
                break
                case 'menu25':{
                    client.sendMessage(m.chat, { image: { url: `./src/logo/terms.png`}, caption: `silakan dibuka untuk melihat *_terms of service_*`}, { quoted: m })
                    await sleep(3000)
                    let teks = `*FORM PEMESANAN* \n\nUsername & Password : \nOS : \nRegion : \nTipe Paket : *4GB RAM 2vCPU* \n\nPrice : _Rp. 35.000,-_`
                    client.sendMessage(m.chat, { text: teks, })
                }
                await sleep(3000)
                {   let teks = `*PERLU DIKETAHUI* \n\n1. Setelah Melakukan Pengisian Form Yang Sudah Diberikan Dan Mengirimkannya Ke WhatsApp Kami Silakan Klik Tombol SELESAI \n\n2.Jika Kamu Tidak Menekan Tombol Tsb Kemungkinan Besar Orderan Kamu Akan Lama Terbaca Oleh Admin \n\n3. Setelah Admin Kami Merespon, Kami Akan Melakukan Pengecekan Ketersediaan Stock Sesuai Permintaan Kamu \n\n4. Jika Stock Sudah Dapat Dikonfirmasi Maka Kemudian Kamu Akan Diminta Transfer Sesuai Dengan Harga Nominal Yang Tertera \n\nTerimakasih`
                    client.sendMessage(m.chat, { text: teks, })
                    await sleep(5000)
                    let text = `Untuk menyelesaikan pesanan silakan pilih opsi dibawah ini ya`
                    let buttons = [
                    {
                        buttonId: prefix+`ram4`, buttonText: {displayText: 'SELESAI'}, type: 1
                    }
                ]
                let buttonMessage = {
                    text: text,
                    footer: 'RYZSTORE',
                    buttons: buttons,
                    headerType: 2,
                }
                await client.sendMessage(m.chat, buttonMessage)
                }   
                break
                case 'menu26':{
                    client.sendMessage(m.chat, { image: { url: `./src/logo/terms.png`}, caption: `silakan dibuka untuk melihat *_terms of service_*`}, { quoted: m })
                    await sleep(3000)
                    let teks = `*FORM PEMESANAN* \n\nUsername & Password : \nOS : \nRegion : \nTipe Paket : *8GB RAM 2vCPU* \n\nPrice : _Rp. 55.000,-_`
                    client.sendMessage(m.chat, { text: teks, })
                }
                await sleep(3000)
                {   let teks = `*PERLU DIKETAHUI* \n\n1. Setelah Melakukan Pengisian Form Yang Sudah Diberikan Dan Mengirimkannya Ke WhatsApp Kami Silakan Klik Tombol SELESAI \n\n2.Jika Kamu Tidak Menekan Tombol Tsb Kemungkinan Besar Orderan Kamu Akan Lama Terbaca Oleh Admin \n\n3. Setelah Admin Kami Merespon, Kami Akan Melakukan Pengecekan Ketersediaan Stock Sesuai Permintaan Kamu \n\n4. Jika Stock Sudah Dapat Dikonfirmasi Maka Kemudian Kamu Akan Diminta Transfer Sesuai Dengan Harga Nominal Yang Tertera \n\nTerimakasih`
                    client.sendMessage(m.chat, { text: teks, })
                    await sleep(5000)
                    let text = `Untuk menyelesaikan pesanan silakan pilih opsi dibawah ini ya`
                    let buttons = [
                    {
                        buttonId: prefix+`ram8`, buttonText: {displayText: 'SELESAI'}, type: 1
                    }
                ]
                let buttonMessage = {
                    text: text,
                    footer: 'RYZSTORE',
                    buttons: buttons,
                    headerType: 2,
                }
                await client.sendMessage(m.chat, buttonMessage)
                } 
                break
                case 'menu27':{
                    client.sendMessage(m.chat, { image: { url: `./src/logo/terms.png`}, caption: `silakan dibuka untuk melihat *_terms of service_*`}, { quoted: m })
                    await sleep(3000)
                    let teks = `*FORM PEMESANAN* \n\nUsername & Password : \nOS : \nRegion : \nTipe Paket : *16GB RAM 4vCPU* \n\nPrice : _Rp. 80.000,-_`
                    client.sendMessage(m.chat, { text: teks, })
                }
                await sleep(3000)
                {   let teks = `*PERLU DIKETAHUI* \n\n1. Setelah Melakukan Pengisian Form Yang Sudah Diberikan Dan Mengirimkannya Ke WhatsApp Kami Silakan Klik Tombol SELESAI \n\n2.Jika Kamu Tidak Menekan Tombol Tsb Kemungkinan Besar Orderan Kamu Akan Lama Terbaca Oleh Admin \n\n3. Setelah Admin Kami Merespon, Kami Akan Melakukan Pengecekan Ketersediaan Stock Sesuai Permintaan Kamu \n\n4. Jika Stock Sudah Dapat Dikonfirmasi Maka Kemudian Kamu Akan Diminta Transfer Sesuai Dengan Harga Nominal Yang Tertera \n\nTerimakasih`
                    client.sendMessage(m.chat, { text: teks, })
                    await sleep(5000)
                    let text = `Untuk menyelesaikan pesanan silakan pilih opsi dibawah ini ya`
                    let buttons = [
                    {
                        buttonId: prefix+`ram16`, buttonText: {displayText: 'SELESAI'}, type: 1
                    }
                ]
                let buttonMessage = {
                    text: text,
                    footer: 'RYZSTORE',
                    buttons: buttons,
                    headerType: 2,
                }
                await client.sendMessage(m.chat, buttonMessage)
                } 
                break
                case 'menu28':{
                    let teks = `*FORM PEMESANAN* \n\nUsername & Password : \nOS : \nRegion : \nTipe Paket : *32GB RAM 8vCPU* \n\nPrice : _Rp. 130.000,-_`
                    client.sendMessage(m.chat, { text: teks, })
                }
                await sleep(3000)
                {   let teks = `*PERLU DIKETAHUI* \n\n1. Setelah Melakukan Pengisian Form Yang Sudah Diberikan Dan Mengirimkannya Ke WhatsApp Kami Silakan Klik Tombol SELESAI \n\n2.Jika Kamu Tidak Menekan Tombol Tsb Kemungkinan Besar Orderan Kamu Akan Lama Terbaca Oleh Admin \n\n3. Setelah Admin Kami Merespon, Kami Akan Melakukan Pengecekan Ketersediaan Stock Sesuai Permintaan Kamu \n\n4. Jika Stock Sudah Dapat Dikonfirmasi Maka Kemudian Kamu Akan Diminta Transfer Sesuai Dengan Harga Nominal Yang Tertera \n\nTerimakasih`
                    client.sendMessage(m.chat, { text: teks, })
                    await sleep(5000)
                    let text = `Untuk menyelesaikan pesanan silakan pilih opsi dibawah ini ya`
                    let buttons = [
                    {
                        buttonId: prefix+`ram32`, buttonText: {displayText: 'SELESAI'}, type: 1
                    }
                ]
                let buttonMessage = {
                    text: text,
                    footer: 'RYZSTORE',
                    buttons: buttons,
                    headerType: 2,
                }
                await client.sendMessage(m.chat, buttonMessage)
                } 
                break
                case 'menu29':{
                    isVote = vote[m.chat][1].concat(vote[m.chat][2])
                    wasVote = isVote.includes(m.sender)
                    if (wasVote) throw '❌ *KAMU HANYA DAPAT MEMILIH SATU KALI* ❌'
                    vote[m.chat][1].push(m.sender)
                    menvote = vote[m.chat][1].concat(vote[m.chat][2],[3])
                    let teks = `*FORM PEMESANAN* \n\nUsername & Password : \nOS : \nRegion : \nTipe Paket : *1GB RAM 1vCPU* \n\nPrice : _Rp. 18.500,-_`
                    client.sendMessage(m.chat, { text: teks, })
                }
                    await sleep(3000)
                    {let teks = `*PERLU DIKETAHUI* \n\n1. Setelah Melakukan Pengisian Form Yang Sudah Diberikan Dan Mengirimkannya Ke WhatsApp Kami Silakan Klik Tombol SELESAI \n\n2.Jika Kamu Tidak Menekan Tombol Tsb Kemungkinan Besar Orderan Kamu Akan Lama Terbaca Oleh Admin \n\n3. Setelah Admin Kami Merespon, Kami Akan Melakukan Pengecekan Ketersediaan Stock Sesuai Permintaan Kamu \n\n4. Jika Stock Sudah Dapat Dikonfirmasi Maka Kemudian Kamu Akan Diminta Transfer Sesuai Dengan Harga Nominal Yang Tertera \n\nTerimakasih`
                    client.sendMessage(m.chat, { text: teks, })
                    await sleep(5000)
                     let text = `Untuk menyelesaikan pesanan silakan pilih opsi dibawah ini ya`
                    let buttons = [
                        {
                            buttonId: prefix+`ram1`, buttonText: {displayText: 'SELESAI'}, type: 1
                        }
                    ]
                    let buttonMessage = {
                        text: text,
                        footer: 'RYZSTORE',
                        buttons: buttons,
                        headerType: 2,
                    }
                    await client.sendMessage(m.chat, buttonMessage)
                }
                break
                case 'menu30':{
                    isVote = vote[m.chat][1].concat(vote[m.chat][2])
                    wasVote = isVote.includes(m.sender)
                    if (wasVote) throw '❌ *KAMU HANYA DAPAT MEMILIH SATU KALI* ❌'
                    vote[m.chat][1].push(m.sender)
                    menvote = vote[m.chat][1].concat(vote[m.chat][2],[3])
                    let teks = `*FORM PEMESANAN* \n\nUsername & Password : \nOS : \nRegion : \nTipe Paket : *4GB RAM 2vCPU* \n\nPrice : _Rp. 35.000,-_`
                    client.sendMessage(m.chat, { text: teks, })
                }
                await sleep(3000)
                {   let teks = `*PERLU DIKETAHUI* \n\n1. Setelah Melakukan Pengisian Form Yang Sudah Diberikan Dan Mengirimkannya Ke WhatsApp Kami Silakan Klik Tombol SELESAI \n\n2.Jika Kamu Tidak Menekan Tombol Tsb Kemungkinan Besar Orderan Kamu Akan Lama Terbaca Oleh Admin \n\n3. Setelah Admin Kami Merespon, Kami Akan Melakukan Pengecekan Ketersediaan Stock Sesuai Permintaan Kamu \n\n4. Jika Stock Sudah Dapat Dikonfirmasi Maka Kemudian Kamu Akan Diminta Transfer Sesuai Dengan Harga Nominal Yang Tertera \n\nTerimakasih`
                    client.sendMessage(m.chat, { text: teks, })
                    await sleep(5000)
                    let text = `Untuk menyelesaikan pesanan silakan pilih opsi dibawah ini ya`
                    let buttons = [
                    {
                        buttonId: prefix+`ram4`, buttonText: {displayText: 'SELESAI'}, type: 1
                    }
                ]
                let buttonMessage = {
                    text: text,
                    footer: 'RYZSTORE',
                    buttons: buttons,
                    headerType: 2,
                }
                await client.sendMessage(m.chat, buttonMessage)
                }   
                break
                case 'menu31':{
                    isVote = vote[m.chat][1].concat(vote[m.chat][2],[3])
                    wasVote = isVote.includes(m.sender)
                    if (wasVote) throw '❌ *KAMU HANYA DAPAT MEMILIH SATU KALI* ❌'
                    vote[m.chat][1].push(m.sender)
                    menvote = vote[m.chat][1].concat(vote[m.chat][2],[3])
                    let teks = `*FORM PEMESANAN* \n\nUsername & Password : \nOS : \nRegion : \nTipe Paket : *8GB RAM 2vCPU* \n\nPrice : _Rp. 55.000,-_`
                    client.sendMessage(m.chat, { text: teks, })
                }
                await sleep(3000)
                {   let teks = `*PERLU DIKETAHUI* \n\n1. Setelah Melakukan Pengisian Form Yang Sudah Diberikan Dan Mengirimkannya Ke WhatsApp Kami Silakan Klik Tombol SELESAI \n\n2.Jika Kamu Tidak Menekan Tombol Tsb Kemungkinan Besar Orderan Kamu Akan Lama Terbaca Oleh Admin \n\n3. Setelah Admin Kami Merespon, Kami Akan Melakukan Pengecekan Ketersediaan Stock Sesuai Permintaan Kamu \n\n4. Jika Stock Sudah Dapat Dikonfirmasi Maka Kemudian Kamu Akan Diminta Transfer Sesuai Dengan Harga Nominal Yang Tertera \n\nTerimakasih`
                    client.sendMessage(m.chat, { text: teks, })
                    await sleep(5000)
                    let text = `Untuk menyelesaikan pesanan silakan pilih opsi dibawah ini ya`
                    let buttons = [
                    {
                        buttonId: prefix+`ram8`, buttonText: {displayText: 'SELESAI'}, type: 1
                    }
                ]
                let buttonMessage = {
                    text: text,
                    footer: 'RYZSTORE',
                    buttons: buttons,
                    headerType: 2,
                }
                await client.sendMessage(m.chat, buttonMessage)
                } 
                break
                case 'menu32':{
                    isVote = vote[m.chat][1].concat(vote[m.chat][2],[3])
                    wasVote = isVote.includes(m.sender)
                    if (wasVote) throw '❌ *KAMU HANYA DAPAT MEMILIH SATU KALI* ❌'
                    vote[m.chat][1].push(m.sender)
                    menvote = vote[m.chat][1].concat(vote[m.chat][2],[3])
                    let teks = `*FORM PEMESANAN* \n\nUsername & Password : \nOS : \nRegion : \nTipe Paket : *16GB RAM 4vCPU* \n\nPrice : _Rp. 80.000,-_`
                    client.sendMessage(m.chat, { text: teks, })
                }
                await sleep(3000)
                {   let teks = `*PERLU DIKETAHUI* \n\n1. Setelah Melakukan Pengisian Form Yang Sudah Diberikan Dan Mengirimkannya Ke WhatsApp Kami Silakan Klik Tombol SELESAI \n\n2.Jika Kamu Tidak Menekan Tombol Tsb Kemungkinan Besar Orderan Kamu Akan Lama Terbaca Oleh Admin \n\n3. Setelah Admin Kami Merespon, Kami Akan Melakukan Pengecekan Ketersediaan Stock Sesuai Permintaan Kamu \n\n4. Jika Stock Sudah Dapat Dikonfirmasi Maka Kemudian Kamu Akan Diminta Transfer Sesuai Dengan Harga Nominal Yang Tertera \n\nTerimakasih`
                    client.sendMessage(m.chat, { text: teks, })
                    await sleep(5000)
                    let text = `Untuk menyelesaikan pesanan silakan pilih opsi dibawah ini ya`
                    let buttons = [
                    {
                        buttonId: prefix+`ram16`, buttonText: {displayText: 'SELESAI'}, type: 1
                    }
                ]
                let buttonMessage = {
                    text: text,
                    footer: 'RYZSTORE',
                    buttons: buttons,
                    headerType: 2,
                }
                await client.sendMessage(m.chat, buttonMessage)
                } 
                break
                case 'menu33':{
                    isVote = vote[m.chat][1].concat(vote[m.chat][2],[3])
                    wasVote = isVote.includes(m.sender)
                    if (wasVote) throw '❌ *KAMU HANYA DAPAT MEMILIH SATU KALI* ❌'
                    vote[m.chat][1].push(m.sender)
                    menvote = vote[m.chat][1].concat(vote[m.chat][2],[3])
                    let teks = `*FORM PEMESANAN* \n\nUsername & Password : \nOS : \nRegion : \nTipe Paket : *32GB RAM 8vCPU* \n\nPrice : _Rp. 130.000,-_`
                    client.sendMessage(m.chat, { text: teks, })
                }
                await sleep(3000)
                {   let teks = `*PERLU DIKETAHUI* \n\n1. Setelah Melakukan Pengisian Form Yang Sudah Diberikan Dan Mengirimkannya Ke WhatsApp Kami Silakan Klik Tombol SELESAI \n\n2.Jika Kamu Tidak Menekan Tombol Tsb Kemungkinan Besar Orderan Kamu Akan Lama Terbaca Oleh Admin \n\n3. Setelah Admin Kami Merespon, Kami Akan Melakukan Pengecekan Ketersediaan Stock Sesuai Permintaan Kamu \n\n4. Jika Stock Sudah Dapat Dikonfirmasi Maka Kemudian Kamu Akan Diminta Transfer Sesuai Dengan Harga Nominal Yang Tertera \n\nTerimakasih`
                    client.sendMessage(m.chat, { text: teks, })
                    await sleep(5000)
                    let text = `Untuk menyelesaikan pesanan silakan pilih opsi dibawah ini ya`
                    let buttons = [
                    {
                        buttonId: prefix+`ram32`, buttonText: {displayText: 'SELESAI'}, type: 1
                    }
                ]
                let buttonMessage = {
                    text: text,
                    footer: 'RYZSTORE',
                    buttons: buttons,
                    headerType: 2,
                }
                await client.sendMessage(m.chat, buttonMessage)
                break
                } 
                case 'listmsg':{
                    const sections = [{
                        title: "WAJIB DIBACA",
                        rows: [
                            { title: "Terms and condition", rowId: prefix +"menu8", description: "Baca dan pahami sebelum menggunakan" }
                        ]
                    }, {
                        title: "Shopee Termasuk Ongkos Kirim",
                        rows: [
                            { title: "Informasi Produk Beserta Harga", rowId: prefix +"menu2", description: "Variasi Harga Beserta Items Shopee" },
                            { title: "Stock Akun", rowId: prefix +"menu3", description: "Mengecek stok yang tersedia" },
                            { title: "Pre Order", rowId: prefix +"menu4", description: "Informasi Pemesanan  Pre Order " },
                            { title: "Informasi Pembayaran", rowId: prefix +"menu9", description: "Silakan Dibaca Sebelum melakukan pembelian Produk" },
                        ]
                    },{
                       title: "Apps Premium",
                       rows: [
                        { title: "Netflix", rowId: prefix +"menu10", description: "memunculkan harga dari produk Netlfix"},
                        { title: "Disney Plus Hotstar", rowId: prefix +"menu11", description: "memunculkan harga dari produk Disney+"},
                        { title: "Spotify", rowId: prefix +"menu12", description: "memunculkan harga dari produk Spotify"},
                        { title: "Vidio", rowId: prefix +"menu13", description: "memunculkan harga dari produk Vidio"},
                        { title: "Get Contact Profesional", rowId: prefix +"menu14", description: "memunculkan harga dari produk Get Contact"},
                        { title: "Youtube Premium", rowId: prefix +"menu15", description: "memunculkan harga dari produk Youtube"},
                       ] 
                    },{
                        title: "Azure Remote Dekstop Protocol",
                        rows: [
                            { title: "Mini Package 1", rowId: prefix +"menu24", description: "RDP Dengan Spesifikasi 1GB RAM & 1vCPU"},
                            { title: "Mini Package 2", rowId: prefix +"menu25", description: "RDP Dengan Spesifikasi 4GB RAM & 2vCPU"},
                            { title: "Premium Package 1", rowId: prefix +"menu26", description: "RDP Dengan Spesifikasi 8GB RAM & 2vCPU"},
                            { title: "Premium Package 2", rowId: prefix +"menu27", description: "RDP Dengan Spesifikasi 16GB RAM & 4vCPU"},
                            { title: "Super Premium Package", rowId: prefix +"menu28", description: "RDP Dengan Spesifikasi 32GB RAM & 8vCPU"},

                        ]
                    }, {
                        title: "LAYANAN BANTUAN",
                        rows: [
                            { title: "Bantuan", rowId: prefix +"menu5", description: "Customer Support" },
                            { title: "Channel Telegram", rowId: prefix +"menu6", description: "Channel Telegram Kami" },
                            { title: "Live Chat", rowId: prefix +"livechat", description: "Untuk menghubungi CS" },
                        ]
                    }]
                    await sendListMessage(from, sections, m)
                }
                break
                case 'spotify':{
                    client.sendMessage(m.chat, { image: { url: `./src/logo/spotify.png`}, caption: `Halo silakan dibuka untuk melihat harga`}, { quoted: m })
                    await sleep(1000)
                    let text = `Untuk melanjutkan pesanan silakan pilih opsi dibawah ini ya`
                    let buttons = [
                        {
                            buttonId: prefix+`spotifymini`, buttonText: {displayText: 'Spotify Mini'}, type: 1
                        },
                        {
                            buttonId: prefix+`spotifyadmin`, buttonText: {displayText: 'Spotify Admin'}, type: 1
                        },
                        {
                            buttonId: prefix+`spotifyindividu`, buttonText: {displayText: 'Spotify Individu'}, type: 1
                        }
                    ]
                    let buttonMessage = {
                        text: text,
                        footer: 'RYZSTORE',
                        buttons: buttons,
                        headerType: 2,
                    }
                    await client.sendMessage(m.chat, buttonMessage)
                }
                break
                case 'netflix':{
                    vote[m.chat] = [q, [], []]
                    await sleep(1000)
                    netflixpriv = vote[m.chat][1]
                    netflixshared = vote[m.chat][2]
                    await client.sendMessage(m.chat, { image: { url: `./src/logo/netflix.png`}, caption: `Halo, Silakan dibuka untuk melihat harga`}, { quoted: m })
                    let text = `Untuk melanjutkan pesanan silakan pilih opsi dibawah ini ya`
                    let buttons = [
                        {
                            buttonId: prefix+`netflixpriv`, buttonText: {displayText: 'Netflix Private'}, type: 1
                        },
                        {
                            buttonId: prefix+`netflixshared`, buttonText: {displayText: 'Netflix Shared'}, type: 1
                        }
                    ]
                    let buttonMessage = {
                        text: text,
                        footer: 'RYZSTORE',
                        buttons: buttons,
                        headerType: 2,
                    }
                    await client.sendMessage(m.chat, buttonMessage)
                }
                break
                case 'vidio':{
                    client.sendMessage(m.chat, { image: { url: `./src/logo/vidio.png`}, caption: `Halo silakan dibuka untuk melihat harga`}, { quoted: m })
                    await sleep(1000)
                    let text = `Untuk melanjutkan pesanan silakan pilih opsi dibawah ini ya`
                    let buttons = [
                        {
                            buttonId: prefix+`vidioplatinumprv`, buttonText: {displayText: 'Platinum Private'}, type: 1
                        },
                        {
                            buttonId: prefix+`vidioplatinumshrd`, buttonText: {displayText: 'Platinum Shared'}, type: 1
                        }
                    ]
                    let buttonMessage = {
                        text: text,
                        footer: 'RYZSTORE',
                        buttons: buttons,
                        headerType: 2,
                    }
                    await client.sendMessage(m.chat, buttonMessage) 
                }
                break
                case 'disney+':{
                    client.sendMessage(m.chat, { image: { url: `./src/logo/disney.png`}, caption: `Halo silakan dibuka untuk melihat harga`}, { quoted: m })
                    await sleep(1000)
                    let text = `Untuk melanjutkan pesanan silakan pilih opsi dibawah ini ya`
                    let buttons = [
                        {
                            buttonId: prefix+`disneypriv`, buttonText: {displayText: 'Disney+ Private'}, type: 1
                        },
                        {
                            buttonId: prefix+`disneyshared`, buttonText: {displayText: 'Disney+ Shared'}, type: 1
                        }
                    ]
                    let buttonMessage = {
                        text: text,
                        footer: 'RYZSTORE',
                        buttons: buttons,
                        headerType: 2,
                    }
                    await client.sendMessage(m.chat, buttonMessage)
                }
                break
                case 'getcontact':{
                    client.sendMessage(m.chat, { image: { url: `./src/logo/getcontact.png`}, caption: `Halo silakan dibuka untuk melihat harga`}, { quoted: m })
                    await sleep(1000)
                    let text = `Untuk melanjutkan pesanan silakan pilih opsi dibawah ini ya`
                    let buttons = [
                        {
                            buttonId: prefix+`gtc1`, buttonText: {displayText: 'Profesional 1 Month'}, type: 1
                        },
                        {
                            buttonId: prefix+`gtc6`, buttonText: {displayText: 'Profesional 6 Month'}, type: 1
                        }
                    ]
                    let buttonMessage = {
                        text: text,
                        footer: 'RYZSTORE',
                        buttons: buttons,
                        headerType: 2,
                    }
                    await client.sendMessage(m.chat, buttonMessage) 
                }
                break

                // joining bot to group
                case 'restart': {
                    if (!isCreator) return null
                    await reply('Restarting...')
                    await sleep(1000)
                    spawn('restart.cmd')
                    break
                }
                case 'join': {
                    if (!text) throw 'Reply dengan \n\njoin *linkgrup*!'
                    if (!isUrl(args[0]) && !args[0].includes('whatsapp.com')) throw 'Link Invalid!'
                    m.reply(mess.wait)
                    let result = args[0].split('https://chat.whatsapp.com/')[1]
                    await client.groupAcceptInvite(result).then((res) => m.reply("*Berhasil Masuk* \n\nJika ingin melihat fitur ketik ' *grupmsg* ' \nTanpa tanda petik ")).catch((err) => m.reply("*TIDAK DAPAT BERGABUNG* \n\nAlasan : Telah Di Keluarkan Dari grup")).catch
                }
                break
                case 'leave': {
                    if (!isCreator) throw mess.owner
                    await client.groupLeave(m.chat).then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
                }
                break
                case 'kick': {
                    if (!m.isGroup) throw mess.group
                    if (!isBotAdmins) throw mess.botAdmin
                    if (!isAdmins) throw mess.admin
                    let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
                    await client.groupParticipantsUpdate(m.chat, [users], 'remove').then((res) => m.reply("jsonformat"(res))).catch((err) => console.log('Terjadi kesalahan'))
                }
                break
                case 'add': {
                    if (!m.isGroup) throw mess.group
                    if (!isBotAdmins) throw mess.botAdmin
                    if (!isAdmins) throw mess.admin
                    let users = m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
                    await client.groupParticipantsUpdate(m.chat, [users], 'add').then((res) => console.log('Terjadi kesalahan, pastikan format penulisan benar!')).catch((err) => console.log('Terjadi kesalahan'))
                }
                break
                case 'promote': {
                    if (!m.isGroup) throw mess.group
                    if (!isBotAdmins) throw mess.botAdmin
                    if (!isAdmins) throw mess.admin
                    let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
                    await client.groupParticipantsUpdate(m.chat, [users], 'promote').then((res) => m.reply('Berhasil menambahkan target sebagai admin')).catch((err) => console.log('Terjadi kesalahan'))
                }
                break
                case 'demote': {
                    if (!m.isGroup) throw mess.group
                    if (!isBotAdmins) throw mess.botAdmin
                    if (!isAdmins) throw mess.admin
                    let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
                    await client.groupParticipantsUpdate(m.chat, [users], 'demote').then((res) => m.reply('Berhasil menurunkan admin menjadi User')).catch((err) => console.log('Terjadi kesalahan'))
                }
                break
                    case 'block': {
                    if (!isCreator) throw mess.owner
                    let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
                    await client.updateBlockStatus(users, 'block').then((res) => m.reply("Sukses blokir target")).catch((err) => console.log('Terjadi kesalahan'))
                }
                break
                    case 'unblock': {
                    if (!isCreator) throw mess.owner
                    let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
                    await client.updateBlockStatus(users, 'unblock').then((res) => m.reply('Sukses membuka blokir target')).catch((err) => console.log('Terjadi kesalahan'))
                }
                break
                case 'setname': case 'setsubject': {
                    if (!m.isGroup) throw mess.group
                    if (!isBotAdmins) throw mess.botAdmin
                    if (!isAdmins) throw mess.admin
                    if (!text) throw 'Text ?'
                    await client.groupUpdateSubject(m.chat, text).then((res) => m.reply(mess.success)).catch((err) => console.log('Terjadi kesalahan'))
                }
                break
                case 'setdesc': case 'setdesk': {
                    if (!m.isGroup) throw mess.group
                    if (!isBotAdmins) throw mess.botAdmin
                    if (!isAdmins) throw mess.admin
                    if (!text) throw 'Text ?'
                    await client.groupUpdateDescription(m.chat, text).then((res) => m.reply(mess.success)).catch((err) => console.log('Terjadi kesalahan'))
                }
                break
                case 'setppbot': {
                    if (!isCreator) throw mess.owner
                    if (!quoted) throw `Kirim/Reply Image Dengan Caption ${prefix + command}`
                    if (!/image/.test(mime)) throw `Kirim/Reply Image Dengan Caption ${prefix + command}`
                    if (/webp/.test(mime)) throw `Kirim/Reply Image Dengan Caption ${prefix + command}`
                    let media = await client.downloadAndSaveMediaMessage(quoted)
                    await client.updateProfilePicture(botNumber, { url: media }).catch((err) => fs.unlinkSync(media))
                    m.reply(mess.success)
                    }
                    break
            case 'setppgroup': case 'setppgrup': case 'setppgc': {
                    if (!m.isGroup) throw mess.group
                    if (!isAdmins) throw mess.admin
                    if (!quoted) throw `Kirim/Reply Image Dengan Caption ${prefix + command}`
                    if (!/image/.test(mime)) throw `Kirim/Reply Image Dengan Caption ${prefix + command}`
                    if (/webp/.test(mime)) throw `Kirim/Reply Image Dengan Caption ${prefix + command}`
                    let media = await client.downloadAndSaveMediaMessage(quoted)
                    await client.updateProfilePicture(m.chat, { url: media }).catch((err) => fs.unlinkSync(media))
                    m.reply(mess.success)
                    }
                    break
                case 'tagall': {
                    if (!m.isGroup) throw mess.group
                    if (!isBotAdmins) throw mess.botAdmin
                    if (!isAdmins) throw mess.admin
                    let teks = `${q ? q : 'Absen'}\n\n`
                        for (let mem of participants) {
                            teks += `• @${mem.id.split('@')[0]}\n`
                        }
                        client.sendMessage(m.chat, { text: teks, mentions: participants.map(a => a.id) }, { quoted: m })
                }
                break
                case 'hidetag': {
                    if (!m.isGroup) throw mess.group
                    if (!isBotAdmins) throw mess.botAdmin
                    if (!isAdmins) throw mess.admin
                    client.sendMessage(m.chat, { text : q ? q : '' , mentions: participants.map(a => a.id)}, { quoted: m })
                }
                break
                case 'group': case 'grup': {
                    if (!m.isGroup) throw mess.group
                    if (!isBotAdmins) throw mess.botAdmin
                    if (!isAdmins) throw mess.admin
                    if (args[0] === 'unlock'){
                        await client.groupSettingUpdate(m.chat, 'announcement').then((res) => m.reply(`Sukses Menutup Group`)).catch((err) => console.log('Terjadi kesalahan'))
                    } else if (args[0] === 'lock'){
                        await client.groupSettingUpdate(m.chat, 'not_announcement').then((res) => m.reply(`Sukses Membuka Group`)).catch((err) => console.log('Terjadi kesalahan'))
                    } else {
                        let buttons = [
                            { buttonId: 'group unlock', buttonText: { displayText: 'Tutup akses Grup' }, type: 1 },
                            { buttonId: 'group lock', buttonText: { displayText: 'Buka akses grup' }, type: 1 }
                        ]
                        await client.sendButtonText(m.chat, buttons, `Mode Group`, client.user.name, m)
                    }
                }
                break
                case 'editinfo': {
                    if (!m.isGroup) throw mess.group
                    if (!isBotAdmins) throw mess.botAdmin
                    if (!isAdmins) throw mess.admin
                    if (args[0] === 'open'){
                        await client.groupSettingUpdate(m.chat, 'unlocked').then((res) => m.reply(`Sukses Membuka Edit Info Group`)).catch((err) => console.log('Terjadi kesalahan'))
                    } else if (args[0] === 'close'){
                        await client.groupSettingUpdate(m.chat, 'locked').then((res) => m.reply(`Sukses Menutup Edit Info Group`)).catch((err) => console.log('Terjadi kesalahan'))
                    } else {
                    let buttons = [
                        { buttonId: 'editinfo open', buttonText: { displayText: 'Open' }, type: 1 },
                        { buttonId: 'editinfo close', buttonText: { displayText: 'Close' }, type: 1 }
                    ]
                    await client.sendButtonText(m.chat, buttons, `Mode Edit Info`, client.user.name, m)

                    }
                }
                break
                case 'linkgroup': case 'linkgc': {
                    if (!m.isGroup) throw mess.group
                    if (!isBotAdmins) throw mess.botAdmin
                    let response = await client.groupInviteCode(m.chat)
                    client.sendText(m.chat, `https://chat.whatsapp.com/${response}\n\nLink Group : ${groupMetadata.subject}`, m, { detectLink: true })
                }
                break
                case 'ephemeral': {
                    if (!m.isGroup) throw mess.group
                    if (!isBotAdmins) throw mess.botAdmin
                    if (!isAdmins) throw mess.admin
                    if (!text) throw 'Masukkan on/off Cok'
                    if (args[0] === 'on') {
                        await client.sendMessage(m.chat, { disappearingMessagesInChat: WA_DEFAULT_EPHEMERAL }).then((res) => m.reply(jsonformat(res))).catch((err) => console.log('Terjadi kesalahan'))
                    } else if (args[0] === 'off') {
                        await client.sendMessage(m.chat, { disappearingMessagesInChat: false }).then((res) => m.reply(jsonformat(res))).catch((err) => console.log('Terjadi kesalahan'))
                    }
                }
                break
                case 'delete': case 'del': {
                    if (!m.quoted) throw false
                    let { chat, fromMe, id, isBaileys } = m.quoted
                    if (!isBaileys) throw 'Pesan tersebut bukan dikirim oleh bot!'
                    client.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: true, id: m.quoted.id, participant: m.quoted.sender } })
                }
                break
                case 'infochat': {
                    if (!m.quoted) m.reply('Reply Pesan')
                    let msg = await m.getQuotedObj()
                    if (!m.quoted.isBaileys) throw 'Pesan tersebut bukan dikirim oleh bot!'
                    let teks = ''
                    for (let i of msg.userReceipt) {
                        let read = i.readTimestamp
                        let unread = i.receiptTimestamp
                        let waktu = read ? read : unread
                        teks += `⭔ @${i.userJid.split('@')[0]}\n`
                        teks += ` ┗━⭔ *Waktu :* ${moment(waktu * 1000).format('DD/MM/YY HH:mm:ss')} ⭔ *Status :* ${read ? 'Dibaca' : 'Terkirim'}\n\n`
                    }
                    client.sendTextWithMentions(m.chat, teks, m)
                }
                break
                case 'q': case 'quoted': {
                    if (!m.quoted) return m.reply('Reply Pesannya!!')
                    let wokwol = await client.serializeM(await m.getQuotedObj())
                    if (!wokwol.quoted) return m.reply('Pesan Yang anda reply tidak mengandung reply')
                    await wokwol.quoted.copyNForward(m.chat, true)
                }
                break
                case 'listpc': {
                    let anu = await store.chats.all().filter(v => v.id.endsWith('.net')).map(v => v.id)
                    let teks = `⬣ *LIST PERSONAL CHAT*\n\nTotal Chat : ${anu.length} Chat\n\n`
                    for (let i of anu) {
                        let nama = store.messages[i].array[0].pushName
                        teks += `⬡ *Nama :* ${nama}\n⬡ *User :* @${i.split('@')[0]}\n⬡ *Chat :* https://wa.me/${i.split('@')[0]}\n\n────────────────────────\n\n`
                    }
                    client.sendTextWithMentions(m.chat, teks, m)
                }
                break
                    case 'listgc': {
                    let anu = await store.chats.all().filter(v => v.id.endsWith('@g.us')).map(v => v.id)
                    let teks = `⬣ *LIST GROUP CHAT*\n\nTotal Group : ${anu.length} Group\n\n`
                    for (let i of anu) {
                        let metadata = await client.groupMetadata(i)
                        teks += `⬡ *Nama :* ${metadata.subject}\n⬡ *Owner :* @${metadata.owner.split('@')[0]}\n⬡ *ID :* ${metadata.id}\n⬡ *Dibuat :* ${moment(metadata.creation * 1000).tz('Asia/Jakarta').format('DD/MM/YYYY HH:mm:ss')}\n⬡ *Member :* ${metadata.participants.length}\n\n────────────────────────\n\n`
                    }
                    client.sendTextWithMentions(m.chat, teks, m)
                }
                break
                case 'listonline': case 'liston': {
                    let id = args && /\d+\-\d+@g.us/.test(args[0]) ? args[0] : m.chat
                    let online = [...Object.keys(store.presences[id]), botNumber]
                    client.sendText(m.chat, 'List Online:\n\n' + online.map(v => '⭔ @' + v.replace(/@.+/, '')).join`\n`, m, { mentions: online })
                }
                break
                case 'public': {
                    if (!isCreator) throw mess.owner
                    client.public = true
                    m.reply('Sukse Change To Public Usage')
                }
                break
                case 'self': {
                    if (!isCreator) throw mess.owner
                    client.public = false
                    m.reply('Sukses Change To Self Usage')
                }
                break
                case 'ping': case 'botstatus': case 'statusbot': {
                    let timestamp = speed()
                    let latensi = speed() - timestamp
                    neww = performance.now()
                    oldd = performance.now()
                    respon = `Speed Response ${latensi.toFixed(4)} _Second_ \n \n\nRuntime : ${runtime(process.uptime())}`
                    m.reply(respon)
                }
                break
                case 'owner': case 'creator': {
                    reply("https://t.me/beeeeple")
                }
                break
                case 'order':{
                    let text = `Untuk Melakukan Pemesanan, Silakan Hubungi Kami Di ${global.owner} atau klik tombol di bawah ini`
                    let buttons = [
                        {
                            buttonId: prefix+`oder`, buttonText: {displayText: 'Pesan'}, type: 1
                        }
                    ]
                    let buttonMessage = {
                        text: text,
                        footer: 'RYZSTORE',
                        buttons: buttons,
                        headerType: 2,
                    }
                    client.sendMessage(m.chat, buttonMessage)
                }
                case 'rdp':{
                    client.sendMessage(m.chat, { image: { url: `./src/logo/terms.png`}, caption: `silakan dibuka untuk melihat *_terms of service_*`}, { quoted: m })
                    await sleep(2000)
                    vote[m.chat] = [q, [], [], []]
                    await sleep(1000)
                    menu31 = vote[m.chat][1]
                    menu32 = vote[m.chat][2]
                    menu33 = vote[m.chat][3]
                    let text = `Butuh *_Spesifikasi_* gimana kak?`
                    let buttons = [
                        {
                            buttonId: prefix+`menu31`, buttonText: {displayText: '8GB RAM 2vCPU'}, type: 1
                        },{
                            buttonId: prefix+`menu32`, buttonText: {displayText: '16GB RAM 4vCPU'}, type: 1
                        },{
                            buttonId: prefix+`menu33`, buttonText: {displayText: '32GB RAM 8vCPU'}, type: 1
                        },
                    ]
                    let buttonMessage = {
                        text: text,
                        footer: 'RYZSTORE',
                        buttons: buttons,
                        headerType: 2,
                    }
                    client.sendMessage(m.chat, buttonMessage)
                }
                    await sleep(500)
                    let teks = `Butuh Spesifikasi Lebih Rendah? Ketik lowrdp`
                    client.sendMessage(m.chat, { text: teks, })
                break
                case 'lowrdp':{
                    vote[m.chat] = [q, [], []]
                    await sleep(1000)
                    menu29 = vote[m.chat][1]
                    menu30 = vote[m.chat][2]
                    let text = `*RDP MINI PACKAGE*`
                    let buttons = [
                        {
                            buttonId: prefix+`menu29`, buttonText: {displayText: '1GB RAM 1vCPU'}, type: 1
                        },{
                            buttonId: prefix+`menu30`, buttonText: {displayText: '4GB RAM 2vCPU'}, type: 1
                        }
                    ]
                    let buttonMessage = {
                        text: text,
                        footer: 'RYZSTORE',
                        buttons: buttons,
                        headerType: 2,
                    }
                    client.sendMessage(m.chat, buttonMessage)
                }
                break
                case'shopeeku':{
                    vote[m.chat] = [q, [], []]
                    await sleep(1000)
                    shopeepolos = vote[m.chat][1]
                    shopeespl = vote[m.chat][2]
                    shopeesplhrg = vote[m.chat][3]
                    await client.sendMessage(m.chat, { image: { url: `./src/logo/shopee.png`}, caption: `Halo, Silakan dibuka untuk melihat daftar produk `}, { quoted: m })
                    let text = `Ingin melakukan pembelian? klik opsi dibawah ini`
                    let buttons = [
                        {
                            buttonId: prefix+`shopeepolos`, buttonText: {displayText: 'Termasuk Ongkos Kirim Polosan'}, type: 1
                        },
                        {
                            buttonId: prefix+`shopeespl`, buttonText: {displayText: 'Termasuk Ongkos Kirim + SPL'}, type: 1
                        },
                        {
                            buttonId: prefix+`shopeesplhrg`, buttonText: {displayText: 'Informasi Harga Termasuk Ongkos Kirim + SPL'}, type: 1
                        }
                    ]
                    let buttonMessage = {
                        text: text,
                        footer: 'RYZSTORE',
                        buttons: buttons,
                        headerType: 2,
                    }
                    await client.sendMessage(m.chat, buttonMessage)
                }
                break
                case 'livechat':{
                    reply(`Permintaan anda untuk terhubung dengan Live Admin Kami Telah *_Berhasil_* \n\nselanjutnya silakan tunggu hingga admin kami membalas`)
                    client.sendMessage(`${global.owner}@s.whatsapp.net`, {  text: `*LIVE CHAT* \n\nSender : https://wa.me/${m.sender.replace('@s.whatsapp.net', '')}\n\nDetail Permintaan: *LIVE CHAT* Sir \n\nSilakan Dicek Dan Diproses` })
                }
                break
                case 'oder':{
                    reply(`Untuk melakukan order produk silahkan klik link di bawah ini\nwa.me/${global.owner}?text=order+produk+kak`)
                    client.sendMessage(`${global.owner}@s.whatsapp.net`, { text: `wa.me/${m.sender.replace('@s.whatsapp.net', '')} menekan tombol order sir` })
                }
                break
                case 'netflixpriv':{
                    isVote = vote[m.chat][1].concat(vote[m.chat][2])
                    wasVote = isVote.includes(m.sender)
                    if (wasVote) throw '❌ *KAMU HANYA DAPAT MEMILIH SATU KALI* ❌'
                    vote[m.chat][1].push(m.sender)
                    menvote = vote[m.chat][1].concat(vote[m.chat][2],[3])
                    client.sendMessage(`${global.owner}@s.whatsapp.net`, { text: `*NOTIFICATION ORDER* \n\nSender : https://wa.me/${m.sender.replace('@s.whatsapp.net', '')}\n\nTipe Pesanan: *NETFLIX PRIVATE* Sir \n\nSilakan Dicek Dan Diproses` })
                    await sleep(1000)
                    reply(`Detail Permintaan : \n\n*PEMBELIAN NETFLIX _PRIVATE_* \nPrice : _Rp 139.000,-_ \n\nAdmin kami akan melakukan konfirmasi ulang, silakan tunggu beberapa saat\n\n*TERIMAKASIH*`)
                }
                break
                case 'netflixshared':{
                    isVote = vote[m.chat][1].concat(vote[m.chat][2])
                    wasVote = isVote.includes(m.sender)
                    if (wasVote) throw '❌ *KAMU HANYA DAPAT MEMILIH SATU KALI* ❌'
                    vote[m.chat][1].push(m.sender)
                    menvote = vote[m.chat][1].concat(vote[m.chat][2],[3])
                    client.sendMessage(`${global.owner}@s.whatsapp.net`, { text: `*NOTIFICATION ORDER* \n\nSender : https://wa.me/${m.sender.replace('@s.whatsapp.net', '')}\n\nTipe Pesanan: *NETFLIX SHARED* Sir \n\nSilakan Dicek Dan Diproses` })
                    await sleep(1000)
                    reply(`Detail Permintaan : \n\n*PEMBELIAN NETFLIX _SHARED_* \nPrice : _Rp 37.000,-_ \n\nAdmin kami akan melakukan konfirmasi ulang, silakan tunggu beberapa saat\n\n*TERIMAKASIH*`)
                }
                break
                case 'disneypriv':{
                    isVote = vote[m.chat][1].concat(vote[m.chat][2])
                    wasVote = isVote.includes(m.sender)
                    if (wasVote) throw '❌ *KAMU HANYA DAPAT MEMILIH SATU KALI* ❌'
                    vote[m.chat][1].push(m.sender)
                    menvote = vote[m.chat][1].concat(vote[m.chat][2],[3])
                    client.sendMessage(`${global.owner}@s.whatsapp.net`, { text: `*NOTIFICATION ORDER* \n\nSender : https://wa.me/${m.sender.replace('@s.whatsapp.net', '')}\n\nTipe Pesanan: *DISNEY+ PRIVATE* Sir \n\nSilakan Dicek Dan Diproses` })
                    await sleep(1000)
                    reply(`Detail Permintaan : \n\n*PEMBELIAN DISNEY PLUS HOTSTAR _PRIVATE_* \nPrice : _Rp 49.000,-_ \n\nAdmin kami akan melakukan konfirmasi ulang, silakan tunggu beberapa saat\n\n*TERIMAKASIH*`)
                }
                break
                case 'disneyshared':{
                    isVote = vote[m.chat][1].concat(vote[m.chat][2])
                    wasVote = isVote.includes(m.sender)
                    if (wasVote) throw '❌ *KAMU HANYA DAPAT MEMILIH SATU KALI* ❌'
                    vote[m.chat][1].push(m.sender)
                    menvote = vote[m.chat][1].concat(vote[m.chat][2],[3])
                    client.sendMessage(`${global.owner}@s.whatsapp.net`, { text: `*NOTIFICATION ORDER* \n\nSender : https://wa.me/${m.sender.replace('@s.whatsapp.net', '')}\n\nTipe Pesanan: *DISNEY+ SHARED* Sir \n\nSilakan Dicek Dan Diproses` })
                    await sleep(1000)
                    reply(`Detail Permintaan : \n\n*PEMBELIAN DISNEY PLUS HOTSTAR _SHARED_* \nPrice : _Rp 23.000,-_ \n\nAdmin kami akan melakukan konfirmasi ulang, silakan tunggu beberapa saat\n\n*TERIMAKASIH*`)
                }
                break
                case 'spotifymini':{
                    isVote = vote[m.chat][1].concat(vote[m.chat][2])
                    wasVote = isVote.includes(m.sender)
                    if (wasVote) throw '❌ *KAMU HANYA DAPAT MEMILIH SATU KALI* ❌'
                    vote[m.chat][1].push(m.sender)
                    menvote = vote[m.chat][1].concat(vote[m.chat][2],[3])
                    client.sendMessage(`${global.owner}@s.whatsapp.net`, { text: `*NOTIFICATION ORDER* \n\nSender : https://wa.me/${m.sender.replace('@s.whatsapp.net', '')}\n\nTipe Pesanan: *SPOTIFY MINI* Sir \n\nSilakan Dicek Dan Diproses` })
                    await sleep(1000)
                    reply(`Detail Permintaan : \n\n*PEMBELIAN SPOTIFY _MINI 1 BULAN_* \nPrice : _Rp 9.999,-_ \n\nAdmin kami akan melakukan konfirmasi ulang, silakan tunggu beberapa saat\n\n*TERIMAKASIH*`)
                }
                break
                case 'spotifyadmin':{
                    isVote = vote[m.chat][1].concat(vote[m.chat][2])
                    wasVote = isVote.includes(m.sender)
                    if (wasVote) throw '❌ *KAMU HANYA DAPAT MEMILIH SATU KALI* ❌'
                    vote[m.chat][1].push(m.sender)
                    menvote = vote[m.chat][1].concat(vote[m.chat][2],[3])
                    client.sendMessage(`${global.owner}@s.whatsapp.net`, { text: `*NOTIFICATION ORDER* \n\nSender : https://wa.me/${m.sender.replace('@s.whatsapp.net', '')}\n\nTipe Pesanan: *SPOTIFY ADMIN* Sir \n\nSilakan Dicek Dan Diproses` })
                    await sleep(1000)
                    reply(`Detail Permintaan : \n\n*PEMBELIAN SPOTIFY _ADMIN 2 BULAN_* \nPrice : _Rp 31.000,-_ \n\nAdmin kami akan melakukan konfirmasi ulang, silakan tunggu beberapa saat\n\n*TERIMAKASIH*`)
                }
                break
                case 'spotifyindividu':{
                    isVote = vote[m.chat][1].concat(vote[m.chat][2])
                    wasVote = isVote.includes(m.sender)
                    if (wasVote) throw '❌ *KAMU HANYA DAPAT MEMILIH SATU KALI* ❌'
                    vote[m.chat][1].push(m.sender)
                    menvote = vote[m.chat][1].concat(vote[m.chat][2],[3])
                    client.sendMessage(`${global.owner}@s.whatsapp.net`, { text: `*NOTIFICATION ORDER* \n\nSender : https://wa.me/${m.sender.replace('@s.whatsapp.net', '')}\n\nTipe Pesanan: *SPOTIFY INDIVIDU* Sir \n\nSilakan Dicek Dan Diproses` })
                    await sleep(1000)
                    reply(`Detail Permintaan : \n\n*PEMBELIAN SPOTIFY _INDIVIDU 2 BULAN_* \nPrice : _Rp 26.000,-_ \n\nAdmin kami akan melakukan konfirmasi ulang, silakan tunggu beberapa saat\n\n*TERIMAKASIH*`)
                }
                break
                case 'vidioplatinumprv':{
                    isVote = vote[m.chat][1].concat(vote[m.chat][2])
                    wasVote = isVote.includes(m.sender)
                    if (wasVote) throw '❌ *KAMU HANYA DAPAT MEMILIH SATU KALI* ❌'
                    vote[m.chat][1].push(m.sender)
                    menvote = vote[m.chat][1].concat(vote[m.chat][2],[3])
                    client.sendMessage(`${global.owner}@s.whatsapp.net`, { text: `*NOTIFICATION ORDER* \n\nSender : https://wa.me/${m.sender.replace('@s.whatsapp.net', '')}\n\nTipe Pesanan: *VIDIO PLATINUM PRIVATE* Sir \n\nSilakan Dicek Dan Diproses` })
                    await sleep(1000)
                    reply(`Detail Permintaan : \n\n*PEMBELIAN VIDIO PLATINUM _PRIVATE_* \nPrice : _Rp 38.000,-_ \n\nAdmin kami akan melakukan konfirmasi ulang, silakan tunggu beberapa saat\n\n*TERIMAKASIH*`)
                }
                break
                case 'vidioplatinumshrd':{
                    isVote = vote[m.chat][1].concat(vote[m.chat][2])
                    wasVote = isVote.includes(m.sender)
                    if (wasVote) throw '❌ *KAMU HANYA DAPAT MEMILIH SATU KALI* ❌'
                    vote[m.chat][1].push(m.sender)
                    menvote = vote[m.chat][1].concat(vote[m.chat][2],[3])
                    client.sendMessage(`${global.owner}@s.whatsapp.net`, { text: `*NOTIFICATION ORDER* \n\nSender : https://wa.me/${m.sender.replace('@s.whatsapp.net', '')}\n\nTipe Pesanan: *VIDIO PLATINUM SHARED* Sir \n\nSilakan Dicek Dan Diproses` })
                    await sleep(1000)
                    reply(`Detail Permintaan : \n\n*PEMBELIAN VIDIO PLATINUM _SHARED_* \nPrice : _Rp 26.000,-_ \n\nAdmin kami akan melakukan konfirmasi ulang, silakan tunggu beberapa saat\n\n*TERIMAKASIH*`)
                }
                break
                case 'gtc1':{
                    isVote = vote[m.chat][1].concat(vote[m.chat][2])
                    wasVote = isVote.includes(m.sender)
                    if (wasVote) throw '❌ *KAMU HANYA DAPAT MEMILIH SATU KALI* ❌'
                    vote[m.chat][1].push(m.sender)
                    menvote = vote[m.chat][1].concat(vote[m.chat][2],[3])
                    client.sendMessage(`${global.owner}@s.whatsapp.net`, { text: `*NOTIFICATION ORDER* \n\nSender : https://wa.me/${m.sender.replace('@s.whatsapp.net', '')}\n\nTipe Pesanan: *GET CONTACT PROF 1 BULAN* Sir \n\nSilakan Dicek Dan Diproses` })
                    await sleep(1000)
                    reply(`Detail Permintaan : \n\n*PEMBELIAN GET CONTACT _PROFESIONAL 1 BULAN_* \nPrice : _Rp 17.000,-_ \n\nAdmin kami akan melakukan konfirmasi ulang, silakan tunggu beberapa saat\n\n*TERIMAKASIH*`)
                }
                break
                case 'gtc6':{
                    isVote = vote[m.chat][1].concat(vote[m.chat][2])
                    wasVote = isVote.includes(m.sender)
                    if (wasVote) throw '❌ *KAMU HANYA DAPAT MEMILIH SATU KALI* ❌'
                    vote[m.chat][1].push(m.sender)
                    menvote = vote[m.chat][1].concat(vote[m.chat][2],[3])
                    client.sendMessage(`${global.owner}@s.whatsapp.net`, { text: `*NOTIFICATION ORDER* \n\nSender : https://wa.me/${m.sender.replace('@s.whatsapp.net', '')}\n\nTipe Pesanan: *GET CONTACT PROF 6 BULAN* Sir \n\nSilakan Dicek Dan Diproses` })
                    await sleep(1000)
                    reply(`Detail Permintaan : \n\n*PEMBELIAN GET CONTACT _PROFESIONAL 6 BULAN_* \nPrice : _Rp 32.000,-_ \n\nAdmin kami akan melakukan konfirmasi ulang, silakan tunggu beberapa saat\n\n*TERIMAKASIH*`)
                }
                break
                case 'yt1':{
                    isVote = vote[m.chat][1].concat(vote[m.chat][2])
                    wasVote = isVote.includes(m.sender)
                    if (wasVote) throw '❌ *KAMU HANYA DAPAT MEMILIH SATU KALI* ❌'
                    vote[m.chat][1].push(m.sender)
                    menvote = vote[m.chat][1].concat(vote[m.chat][2],[3])
                    client.sendMessage(`${global.owner}@s.whatsapp.net`, { text: `*NOTIFICATION ORDER* \n\nSender : https://wa.me/${m.sender.replace('@s.whatsapp.net', '')}\n\nTipe Pesanan: *YOUTUBE INVITE 1 BULAN* Sir \n\nSilakan Dicek Dan Diproses` })
                    await sleep(1000)
                    reply(`Detail Permintaan : \n\n*PEMBELIAN YOUTUBE PREMIUM _INVITE 1 BULAN_* \nPrice : _Rp 7.000,-_ \n\nAdmin kami akan melakukan konfirmasi ulang, silakan tunggu beberapa saat\n\n*TERIMAKASIH*`)
                }
                break
                case 'yt4':{
                    isVote = vote[m.chat][1].concat(vote[m.chat][2])
                    wasVote = isVote.includes(m.sender)
                    if (wasVote) throw '❌ *KAMU HANYA DAPAT MEMILIH SATU KALI* ❌'
                    vote[m.chat][1].push(m.sender)
                    menvote = vote[m.chat][1].concat(vote[m.chat][2],[3])
                    client.sendMessage(`${global.owner}@s.whatsapp.net`, { text: `*NOTIFICATION ORDER* \n\nSender : https://wa.me/${m.sender.replace('@s.whatsapp.net', '')}\n\nTipe Pesanan: *YOUTUBE ADMIN 4 BULAN* Sir \n\nSilakan Dicek Dan Diproses` })
                    await sleep(1000)
                    reply(`Detail Permintaan : \n\n*PEMBELIAN YOUTUBE PREMIUM _ADMIN 4 BULAN_* \nPrice : _Rp 16.000,-_ \n\nAdmin kami akan melakukan konfirmasi ulang, silakan tunggu beberapa saat\n\n*TERIMAKASIH*`)
                }
                break
                case 'shopeepolos':{
                    isVote = vote[m.chat][1].concat(vote[m.chat][2],[3])
                    wasVote = isVote.includes(m.sender)
                    if (wasVote) throw '❌ *KAMU HANYA DAPAT MEMILIH SATU KALI* ❌'
                    vote[m.chat][1].push(m.sender)
                    menvote = vote[m.chat][1].concat(vote[m.chat][2],[3])
                    client.sendMessage(`${global.owner}@s.whatsapp.net`, { text: `*NOTIFICATION ORDER* \n\nSender : https://wa.me/${m.sender.replace('@s.whatsapp.net', '')}\n\nTipe Pesanan: *TERMASUK ONGKOS KIRIM POLOSAN* Sir \n\nSilakan Dicek Dan Diproses` })
                    await sleep(1000)
                    reply(`Detail Permintaan : \n\n*PEMBELIAN SHOPEE TERMASUK ONGKOS KIRIM _POLOSAN_* \nPrice : _Rp 1.000.000,-_ \n\nAdmin kami akan melakukan konfirmasi ulang, silakan tunggu beberapa saat\n\n*TERIMAKASIH*`)
                }
                break
                case 'shopeespl':{
                    isVote = vote[m.chat][1].concat(vote[m.chat][2],[3])
                    wasVote = isVote.includes(m.sender)
                    if (wasVote) throw '❌ *KAMU HANYA DAPAT MEMILIH SATU KALI* ❌'
                    vote[m.chat][1].push(m.sender)
                    menvote = vote[m.chat][1].concat(vote[m.chat][2],[3])
                    client.sendMessage(`${global.owner}@s.whatsapp.net`, { text: `*NOTIFICATION ORDER* \n\nSender : https://wa.me/${m.sender.replace('@s.whatsapp.net', '')}\n\nTipe Pesanan: *TERMASUK ONGKOS KIRIM + SPL* Sir \n\nSilakan Dicek Dan Diproses` })
                    await sleep(1000)
                    reply(`❌ *MAAF STOCK PRODUK SEDANG KOSONG* `)
                    let text = `Ingin diberitahu jika Stock Ready? Klik Dibawah ini ya`
                    let buttons = [
                        {
                            buttonId: prefix+`ingetin`, buttonText: {displayText: 'Ingatkan Saya!'}, type: 1
                        }
                    ]
                    let buttonMessage = {
                        text: text,
                        footer: 'RYZSTORE',
                        buttons: buttons,
                        headerType: 2,
                    }
                    client.sendMessage(m.chat, buttonMessage)
                }
                break
                case 'ingetin':{
                    client.sendMessage(`${global.owner}@s.whatsapp.net`, { text: `*REQUEST PESAN PENGINGAT* \n\nSender : https://wa.me/${m.sender.replace('@s.whatsapp.net', '')}\n\nTipe Pesanan: *MINTA DI INGETIN JIKA STOCK READY* Sir \n\nSilakan Dicek Dan Diproses` })
                    await sleep(1000)
                    reply(`*OK*`)
                }
                break
                case 'shopeesplhrg':{
                    isVote = vote[m.chat][1].concat(vote[m.chat][2],[3])
                    wasVote = isVote.includes(m.sender)
                    if (wasVote) throw '❌ *KAMU HANYA DAPAT MEMILIH SATU KALI* ❌'
                    vote[m.chat][1].push(m.sender)
                    menvote = vote[m.chat][1].concat(vote[m.chat][2],[3])
                    client.sendMessage(`${global.owner}@s.whatsapp.net`, { text: `*MEMINTA INFORMASI HARGA SPL* \n\nSender : https://wa.me/${m.sender.replace('@s.whatsapp.net', '')}\n\nTipe Pesanan: *MINTA INFORMASI HARGA SHOPEE SPL* Sir \n\nSilakan Dicek Dan Diproses` })
                    await sleep(1000)
                    reply(`Detail Permintaan : \n\n*MEMINTA INFORMASI HARGA SHOPEE SUPPORT SPL* \nPrice : _Rp 3JT++,-_\n_Untuk harga yang lebih akurat silakan tunggu admin kami merespon permintaan anda_ \n\n*TERIMAKASIH*`)
                }
                break
                case 'ram1':{
                    client.sendMessage(`${global.owner}@s.whatsapp.net`, { text: `*SELESAI MELAKUKAN PENGISIAN FORM ORDER* \n\nSender : https://wa.me/${m.sender.replace('@s.whatsapp.net', '')}\n\nTipe Pesanan: *RDP 1GB RAM 1vCPU* Sir \n\nSilakan Dicek Dan Diproses` })
                    await sleep(1000)
                    reply(`*TERIMAKASIH SUDAH MELAKUKAN PENGISIAN FORM* \n\nSelanjutnya tunggu hingga admin kami merespon`)
                }
                break
                case 'ram4':{
                    client.sendMessage(`${global.owner}@s.whatsapp.net`, { text: `*SELESAI MELAKUKAN PENGISIAN FORM ORDER* \n\nSender : https://wa.me/${m.sender.replace('@s.whatsapp.net', '')}\n\nTipe Pesanan: *RDP 4GB RAM 2vCPU* Sir \n\nSilakan Dicek Dan Diproses` })
                    await sleep(1000)
                    reply(`*TERIMAKASIH SUDAH MELAKUKAN PENGISIAN FORM* \n\nSelanjutnya tunggu hingga admin kami merespon`)
                }
                break
                case 'ram8':{
                    client.sendMessage(`${global.owner}@s.whatsapp.net`, { text: `*SELESAI MELAKUKAN PENGISIAN FORM ORDER* \n\nSender : https://wa.me/${m.sender.replace('@s.whatsapp.net', '')}\n\nTipe Pesanan: *RDP 8GB RAM 2vCPU* Sir \n\nSilakan Dicek Dan Diproses` })
                    await sleep(1000)
                    reply(`*TERIMAKASIH SUDAH MELAKUKAN PENGISIAN FORM* \n\nSelanjutnya tunggu hingga admin kami merespon`)
                }
                break
                case 'ram16':{
                    client.sendMessage(`${global.owner}@s.whatsapp.net`, { text: `*SELESAI MELAKUKAN PENGISIAN FORM ORDER* \n\nSender : https://wa.me/${m.sender.replace('@s.whatsapp.net', '')}\n\nTipe Pesanan: *RDP 16GB RAM 4vCPU* Sir \n\nSilakan Dicek Dan Diproses` })
                    await sleep(1000)
                    reply(`*TERIMAKASIH SUDAH MELAKUKAN PENGISIAN FORM* \n\nSelanjutnya tunggu hingga admin kami merespon`)
                }
                break
                case 'ram32':{
                    client.sendMessage(`${global.owner}@s.whatsapp.net`, { text: `*SELESAI MELAKUKAN PENGISIAN FORM ORDER* \n\nSender : https://wa.me/${m.sender.replace('@s.whatsapp.net', '')}\n\nTipe Pesanan: *RDP 32GB RAM 8vCPU* Sir \n\nSilakan Dicek Dan Diproses` })
                    await sleep(1000)
                    reply(`*TERIMAKASIH SUDAH MELAKUKAN PENGISIAN FORM* \n\nSelanjutnya tunggu hingga admin kami merespon`)
                }
                break
                default:{
                    
                }
            }
        }
        
    } catch (err) {
        m.reply(util.format(err))
    }
}


let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
})
