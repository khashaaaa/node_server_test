local base_url = "http://localhost:8082/users"

local names = {
    "John Smith", "Emma Wilson", "Michael Brown", "Sarah Davis", "James Anderson",
    "Lisa Thompson", "David Miller", "Jennifer White", "Robert Taylor", "Mary Johnson",
    "William Lee", "Patricia Moore", "Richard Jackson", "Linda Martin", "Thomas Wright",
    "Elizabeth Hall", "Joseph Clark", "Barbara Lewis", "Charles Young", "Susan King"
}

local domains = {"gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "example.com"}

local request_counter = 0
local success_counter = 0
local error_counter = 0
local start_time = 0
local used_names = {}
local email_counter = 0

local function generate_user_data()
    local available_names = {}
    for _, name in ipairs(names) do
        if not used_names[name] then
            table.insert(available_names, name)
        end
    end
    
    if #available_names == 0 then
        used_names = {}
        available_names = names
    end
    
    local name = available_names[math.random(#available_names)]
    used_names[name] = true
    
    email_counter = email_counter + 1
    local email = string.format("%s.%d@%s",
        string.lower(string.gsub(name, " ", ".")),
        email_counter,
        domains[math.random(#domains)])
    
    request_counter = request_counter + 1
    return string.format('{"name":"%s", "email":"%s"}', name, email)
end

function init(args)
    start_time = os.time()
    math.randomseed(os.time())
end

function request()
    local method = math.random(1, 100)
    local headers = {
        ["Content-Type"] = "application/json",
        ["Accept"] = "application/json"
    }
    
    if method <= 40 then
        return wrk.format("GET", base_url, headers)
    
    elseif method <= 80 then
        local payload = generate_user_data()
        headers["Content-Length"] = #payload
        return wrk.format("POST", base_url .. "/create", headers, payload)
    
    elseif method <= 90 then
        local user_id = math.random(1, 100)
        local payload = generate_user_data()
        headers["Content-Length"] = #payload
        return wrk.format("PUT", base_url .. "/" .. user_id .. "/update", headers, payload)
    
    else
        local user_id = math.random(1, 100)
        return wrk.format("DELETE", base_url .. "/" .. user_id .. "/delete", headers)
    end
end

function response(status, headers, body)
    if status == 200 or status == 201 then
        success_counter = success_counter + 1
    else
        error_counter = error_counter + 1
    end
end

function done(summary, latency, requests)
    local duration = os.time() - start_time
    local rps = duration > 0 and request_counter/duration or 0
    
    print("\n=== Test Results ===")
    print(string.format("Duration: %d seconds", duration))
    print(string.format("Total Requests: %d", request_counter))
    print(string.format("Successful Requests: %d", success_counter))
    print(string.format("Failed Requests: %d", error_counter))
    print(string.format("Requests/sec: %.2f", rps))
    print(string.format("Average Latency: %.2fms", latency.mean/1000))
    print(string.format("Max Latency: %.2fms", latency.max/1000))
    print(string.format("50th percentile: %.2fms", latency:percentile(50)/1000))
    print(string.format("90th percentile: %.2fms", latency:percentile(90)/1000))
    print(string.format("99th percentile: %.2fms", latency:percentile(99)/1000))
    print("==================\n")
end
