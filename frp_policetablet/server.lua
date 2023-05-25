ESX.RegisterServerCallback("frp_policeTablet:GetData", function(source,cb,args)
    if args.type == 'searhCitizen' or args.type == 'searhForVeh' then
        local _source = source
        local xPlayer = ESX.GetPlayerFromId(source)
        local result = MySQL.prepare.await('SELECT firstname,lastname,dateofbirth,licenses,job,job_grade,ssn FROM users WHERE ssn = ?', {args.ssn})
        local fine = MySQL.prepare.await('SELECT id,fine_note,fine,data,finefrom,jailtime FROM frp_policetablet_fines WHERE ssn = ?', {args.ssn})
        local notes = MySQL.prepare.await('SELECT id,note,notefrom,data FROM frp_policetablet_notes WHERE ssn = ?', {args.ssn})

        if not result then
            result = 0
        end
        if not fine then
            fine = 0
        end
        if not notes then
            notes = 0
        end
        if result ~= 0 then
            if ESX.Jobs[result.job].label then
                result.job = ESX.Jobs[result.job].label
            else
                result.job = "Błąd"
            end
            result.weapon_allow = (json.decode(result.licenses)["weapon"] and 1 or 0)
        end
        cb(result,fine,notes)
    end
end)

exports["frp_tokenizer"]:RegisterEvent('frp_policetablet:SendNote', function(source, data)
    MySQL.insert.await("INSERT INTO `frp_policetablet_notes` (`ssn`, `note`, `notefrom`, `data`) VALUES (?,?,?,CURRENT_DATE)",{data.ssn,data.note,data.name,})
end)

ESX.RegisterServerCallback("frp_policeTablet:GetDataF", function(source,cb,args)
    if args.type == 'searhCitizenF' then
        local result = MySQL.prepare.await('SELECT firstname,lastname,dateofbirth,licenses,job,job_grade,ssn FROM users WHERE ssn = ?', {args.ssn})
        if not result then
            result = 0
        end
        if result ~= 0 then
            result.job = ESX.Jobs[result.job].label
            result.weapon_allow = (json.decode(result.licenses)["weapon"] and 1 or 0)
        end
        cb(result)
    end
end)

exports["frp_tokenizer"]:RegisterEvent('frp_policetablet:GiveFine', function(source, data)
    local _source = source
    local xPlayer = ESX.GetPlayerFromId(source)
    local ssn = xPlayer.ssn
    local targetPlayer = ESX.GetPlayerFromSSN(data.pssn)
    MySQL.insert.await("INSERT INTO `frp_policetablet_fines` (`ssn`, `fine_note`, `fine`, `jailtime`, `data`, `finefrom`, `finefromssn`) VALUES (?,?,?,?,CURRENT_DATE,?,?)",{
        data.pssn,data.fine,data.price,0,data.Mname,ssn})
    targetPlayer.showNotification('Dostałeś mandat od '..data.Mname.." w kwocie "..data.price.."$")
end)


ESX.RegisterServerCallback("frp_policeTablet:GetCar", function(source,cb,args)
    local result = MySQL.prepare.await('SELECT owner,vehicle,ishunt FROM user_vehicles WHERE plate = ?', {args.plate})
    local result2
    if not result or result == nil then
        result = 0
        result2= nil
    else
        result2 = MySQL.prepare.await('SELECT firstname,lastname,ishunt FROM users WHERE ssn = ?', {result.owner})    
    end
    cb(result, result2)
end)


ESX.RegisterServerCallback("frp_policeTablet:GetDataD", function(source,cb,args)
        local result = MySQL.prepare.await('SELECT firstname,lastname,dateofbirth,licenses,job,job_grade,ssn FROM users WHERE ssn = ?', {args.ssn})
        if not result then
            result = 0
        end
        if result ~= 0 then
            result.job = ESX.Jobs[result.job].label
            result.weapon_allow = (json.decode(result.licenses)["weapon"] and 1 or 0)
        end
        cb(result)
end)

exports["frp_tokenizer"]:RegisterEvent('frp_policetablet:GiveDict', function(source, data)
    local _source = source
    local xPlayer = ESX.GetPlayerFromId(source)
    local ssn = xPlayer.ssn
    local targetPlayer = ESX.GetPlayerFromSSN(data.pssn)
    MySQL.insert.await("INSERT INTO `frp_policetablet_fines` (`ssn`, `fine_note`, `fine`, `jailtime`, `data`, `finefrom`, `finefromssn`) VALUES (?,?,?,?,CURRENT_DATE,?,?)",{
        data.pssn,data.fine,data.price,data.jailtime,data.Mname,ssn})
    targetPlayer.showNotification('Dostałeś Grzywne od '..data.Mname.." w kwocie "..data.price.."$ i odsiadke na czas "..data.jailtime.." miesięcy")
end)

ESX.RegisterServerCallback("frp_policeTablet:AddWAllow", function(source,cb,args)
    local _source = source
    local xPlayer = ESX.GetPlayerFromId(source)
    local ssn = xPlayer.ssn
    
    if args.action == 'add' then   
        
        local result = MySQL.update.await('UPDATE users SET licenses = ? WHERE ssn = ?', {'{"weapon":true}', args.ssn})
        
        if result then
            cb(true,true)
        else
            cb(false)
        end
    elseif args.action == 'remove' then
        local result = MySQL.update.await('UPDATE users SET licenses = ? WHERE ssn = ?', {'{"weapon":false}', args.ssn})
        if result then
            cb(true,false)
        else
            cb(false)
        end
    end
    
end)