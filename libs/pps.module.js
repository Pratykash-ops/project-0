async function auth(adm_no) {
    const raw = await fetch("https://pps.entab.info/Logon/UserConfirm", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: `Userid=P${adm_no}`,
    });
    if (raw.ok) {
        const res = await raw.json()
        if (res?.Data?.[0]) {
            console.log(res)
            const { EmployeeIDStudentID, UserName, UID } = res.Data[0][0]
            return {
                verified: true,
                ClientImage: `/api/transport?pq=${btoa(`https://pps.entab.info/StudentPhoto/S${EmployeeIDStudentID}.jpg`)}`,
                verificationData: {
                    GuardianImage: `/api/transport?pq=${btoa(`https://pps.entab.info/FatherPhoto/F${EmployeeIDStudentID}.jpg`)}`,
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
module.exports.auth = auth