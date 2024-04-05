function generateUsername() {
    const firstNames = [
        "Piper", "Eleven", "Bojack", "Walter",
        "Lucifer", "Daenerys", "Sherlock", "Rachel", "Dexter",
        "Tony", "Morty", "Michael", "Hannah", "Jon",
        "Goku", "Buffy", "Frodo", "Rick", "Luffy",
        "Berlin", "Tokyo", "Professor", "Rio", "Nairobi",
        "Chandler", "Monica", "Ross", "Rachel", "Phoebe",
        "Lucas", "Elena", "Arturo", "Alison", "Denver",
        "Naruto", "Sasuke", "Sakura", "Kakashi", "Hinata",
        "Light", "L", "Misa", "Ryuk", "Near",
        "Natsu", "Lucy", "Gray", "Erza", "Happy",
        "Dominic", "Murphy", "Cooper", "Brand", "TARS",
        "Luffy", "Zoro", "Nami", "Sanji", "Usopp",
    ];

    const lastNames = [
        "Chapman", "Wheeler", "Horseman", "White",
        "Morningstar", "Targaryen", "Holmes", "Green", "Morgan",
        "Stark", "Smith", "Sanchez", "Scott", "Snow",
        "Vegeta", "Summers", "Baggins", "Grimes", "Monkey D.",
        "Von Einsen", "Dixon", "McConaughey", "McAdams", "Chastain",
        "Straw Hat", "Vinsmoke", "Nico Robin", "Franky", "Brook",
        "Smith", "Geller", "Bing", "Buffay", "Tribbiani",
        "Nascimento", "Ferreira", "Soares", "Batista", "Figueira",
        "Uchiha", "Hatake", "Hyuga", "Uzumaki", "Haruno",
        "Yagami", "Lawliet", "Amane", "Rem", "Ryuzaki",
        "Dragneel", "Heartfilia", "Fullbuster", "Scarlet",
        "Toretto", "O'Conner", "Shelby", "Teller", "Winston",
        "Marshall", "Dundee", "Connelly", "Yoda",
        "Nair", "Rao", "Menon", "Iyer", "Agarwal",
        "Das", "Srivastava", "Chauhan", "Thakur", "Bhattacharya",
        "Choudhury",
    ];

    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];

    const username = firstName.toLowerCase() + " " +  lastName.toLowerCase()

    return username;
}

module.exports = generateUsername
