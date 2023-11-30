function deleted(ID){ 
    const data = { 
        "ID": ID 
    } 
    fetch("/deleteuser", { 
        method: "POST", 
        headers: { 
            "Content-Type": "application/json", 
        }, 
        body: JSON.stringify(data) 
    }) 
}