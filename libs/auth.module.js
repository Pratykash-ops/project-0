async function ppsAuthByAdmNo({ admn_no }) {
    const raw = await fetch("https://pps.entab.info/Logon/UserConfirm", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: `Userid=P${admn_no}`,
    });
    if (raw.ok) {
        const res = await raw.json()
        if (res?.Data?.[0]) {
            const { EmployeeIDStudentID, UserName, UID } = res.Data[0][0]
            return {
                verified: true,
                ClientImage: `https://pps.entab.info/StudentPhoto/S${EmployeeIDStudentID}.jpg`,
                verificationData: {
                    GuardianImage: `https://pps.entab.info/FatherPhoto/F${EmployeeIDStudentID}.jpg`,
                    GuardianName: UserName,
                    Uid: UID
                }
            }
        }
        else {
            return {
                verified: false
            }
        }
    }
    return {
        verified: false
    }
}

// CHANGES TO THIS FILES ARE RESTRICTED ONLY AUTHORIZED PERSONELS ARE ALLOWED TO MAKE CHANGES IN THIS FILE.
// IF YOU GET CAUGHT CHANGING THIS FILE, YOU'LL GET FIRED

const moduleMap = [
    {
        name: "pps",
        fx: ppsAuthByAdmNo
    }
]

const main = (moduleName, args) => {
    try {
        return moduleMap.filter((v) => v.name == moduleName)[0].fx(args)
    } catch (error) {
        new Error("Module not found")
    }
}

module.exports = main