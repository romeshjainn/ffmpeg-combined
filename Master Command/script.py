import os

# List of file names
file_names = [
    'Dekh Phool Phool',
    'Dekhau Bhai',
    'Ghol Ghumai - Tukhari',
    'Hamari-Pyari-(Hameer)',
    'Har Charan Saran - Bhimpalasi',
    'Har-Har-Naam-Japantia-Asa',
    'Hau Dhoodendi - Abhogi Kanra',
    'Hum Ghar Sajan Aaye',
    'Je Gur Charni - Gauri',
    'Ghungroo-Vaaje',
    'Kahe-Re-Ban',
    'Kavan-Bani-Ri-Teri-Laali',
    'Keerat Karan Saran Manmohan',
    'Meethe Tere Bol',
    'Mere Man Pardesi - Maalkauns',
    'Mero Sundar',
    'Mith Bolra Ji - Zila',
    'Oha Prem Piri - Asa',
    'Man-Mere-Bhoole-Khamaaj',
    'Pavat Raliya',
    'Rajan Kaun - Bhairvi',
    'Rasna Gun Gopal - Bilaaskhani Todi',
    'Sajan Tere Charan - Durga',
    'Sajan-Maida-Chaiyaa-Asavari',
    'Sant Payi Gur - Bilawal',
    'Supne Ubhi Bhayi',
    'Tu Thaakaro Bairaagro',
    'Tu har bhaj',
    'Tu-Har-Bhaj-English'
]

# Generate .txt files
for file_name in file_names:
    # Replace spaces with hyphens to create valid file names
    sanitized_file_name = file_name.replace(' ', '-') + '.txt'
    
    # Create and open the file for writing
    with open(sanitized_file_name, 'w') as file:
        file.write('')  # Write an empty string to create the file

print("Files created successfully.")
