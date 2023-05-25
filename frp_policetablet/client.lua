local GiveSSN

RegisterNUICallback("NUIFocusOff", function()
	SetNuiFocus(false, false)
	ExecuteCommand('anim_cancel')
end)

RegisterNUICallback("Getdata", function(data)
	ESX.TriggerServerCallback("frp_policeTablet:GetData", function(user,fine,notes)
		if user == nil or user == 0 then
				SendNUIMessage({
					action = "updateData",
					user = false
				})
		else
			GiveSSN = user.ssn
			SendNUIMessage({
				action = "updateData",
				user = user,
				fine  = fine,
				notes = notes,
				playerData = ESX.PlayerData,
			})
		end
	end, data)
end)

RegisterNUICallback("SendNote", function(data)
	data.name = ESX.PlayerData.firstname..' '..ESX.PlayerData.lastname
	data.ssn = GiveSSN
	-- tokenizer Client

	exports["frp_tokenizer"]:TriggerEvent('frp_policetablet:SendNote',data)
	SendNUIMessage({
		action = "noteEnd",
	})
	ESX.ShowNotification('Wypisano Notatke!')
end)

RegisterNUICallback("GetdataF", function(data)
	ESX.TriggerServerCallback("frp_policeTablet:GetDataF", function(user,fine)
		if user == nil or user == 0 then
			SendNUIMessage({
				action = "updateDataF",
				user = false
			})
		else
			GiveSSN = user.ssn
			SendNUIMessage({
				action = "updateDataF",
				user = user,
			})
		end
	end, data)
end)

RegisterNUICallback("GiveFine", function(data)
	data.Mname = ESX.PlayerData.firstname..' '..ESX.PlayerData.lastname
	data.pssn = GiveSSN
	-- tokenizer Client
	exports["frp_tokenizer"]:TriggerEvent('frp_policetablet:GiveFine', data)
	-- SendNUIMessage({
	-- 	action = "FineEnd",
	-- })
	ESX.ShowNotification('Wystawiono Mandat!')
end)

RegisterNUICallback("GetCar", function(data)
	ESX.TriggerServerCallback("frp_policeTablet:GetCar", function(car,user)
		if car == nil or car == 0 then
			SendNUIMessage({
				action = "UpdateCar",
				car = false
			})
		else
		
			local label = GetDisplayNameFromVehicleModel(json.decode(car.vehicle).model)
			SendNUIMessage({
				action = "UpdateCar",
				car = car,
				label = label,
				user = user
			})
		end
	end, data)
end)

RegisterNUICallback("GetdataD", function(data)
	ESX.TriggerServerCallback("frp_policeTablet:GetDataD", function(user)
		if user == nil or user == 0 then
			SendNUIMessage({
				action = "updateDataD",
				user = false
			})
		else
			GiveSSN = user.ssn
			SendNUIMessage({
				action = "updateDataD",
				user = user,
			})
		end
	end, data)
end)

RegisterNUICallback("GiveDict", function(data)
	data.Mname = ESX.PlayerData.firstname..' '..ESX.PlayerData.lastname
	data.pssn = GiveSSN
	-- tokenizer Client
	exports["frp_tokenizer"]:TriggerEvent('frp_policetablet:GiveDict', data)
	-- SendNUIMessage({
	-- 	action = "FineEnd",
	-- })
	ESX.ShowNotification('Wydano Wyrok!')
end)

RegisterNUICallback('AddWAllow',function(data)
	ESX.TriggerServerCallback("frp_policeTablet:AddWAllow", function(done,action)
		if done then
			if action then
				ESX.ShowNotification('Nadano Licencje dla '..data.ssn)
			else
				ESX.ShowNotification('Usunięto Licencje u '..data.ssn)
			end
		else
			ESX.ShowNotification('Błąd!')
		end
	end, data)
end)

RegisterNetEvent('frp_policetablet:openTablet',function()
	if ESX.PlayerData.job ~= nil and ESX.PlayerData.job.name == 'police' then
		ExecuteCommand('e tablet2')
		SendNUIMessage({
			action = "openTablet",
			data = ESX.PlayerData
		},
		SetNuiFocus(true, true))
	end
end)


-- Citizen.CreateThread(function()
-- while true do
-- 	ped = PlayerPedId()
-- 	if IsPedInAnyVehicle(ped) then
-- 		print()
-- 	end
-- 	Wait(1250)
-- end

-- end)