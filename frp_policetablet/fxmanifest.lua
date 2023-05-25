fx_version 'cerulean'
game 'gta5'
version '1.0'
lua54 "yes"

ui_page 'html/ui.html'

shared_scripts {
	'@ox_lib/init.lua',
    '@es_extended/imports.lua'
}

client_scripts {
	'client.lua'
}

server_scripts{
	'@oxmysql/lib/MySQL.lua',
	"server.lua"
}


files {
	'html/ui.html',
	'html/ui.css',
	'html/ui.js',
}
