import mongoose from 'mongoose';
import User from '../../models/user';
import bcrypt from 'bcrypt';

async function seedDatabase() {
  try {
    const usersToSeed = [
      {
        email: 'user1@example.com',
        password: await bcrypt.hash('password1', 10),
        firstName: 'John',
        lastName: 'Doe',
        transactions: [
          {
            "account_id": "BpPGA58ql6fE4mLL4noJCJwLR6WZ6atzgqVGy",
            "account_owner": null,
            "amount": 6.33,
            "authorized_date": "2023-11-08",
            "authorized_datetime": null,
            "category": ["Travel", "Taxi"],
            "category_id": "22016000",
            "check_number": null,
            "counterparties": [
              {
                "confidence_level": "VERY_HIGH",
                "entity_id": "eyg8o776k0QmNgVpAmaQj4WgzW9Qzo6O51gdd",
                "logo_url": "https://plaid-merchant-logos.plaid.com/uber_1060.png",
                "name": "Uber",
                "type": "merchant",
                "website": "uber.com"
              }
            ],
            "date": "2023-11-09",
            "datetime": null,
            "iso_currency_code": "GBP",
            "location": {
              "address": null,
              "city": null,
              "country": null,
              "lat": null,
              "lon": null,
              "postal_code": null,
              "region": null,
              "store_number": null
            },
            "logo_url": "https://plaid-merchant-logos.plaid.com/uber_1060.png",
            "merchant_entity_id": "eyg8o776k0QmNgVpAmaQj4WgzW9Qzo6O51gdd",
            "merchant_name": "Uber",
            "name": "Uber 072515 SF**POOL**",
            "payment_channel": "online",
            "payment_meta": {
              "by_order_of": null,
              "payee": null,
              "payer": null,
              "payment_method": null,
              "payment_processor": null,
              "ppd_id": null,
              "reason": null,
              "reference_number": null
            },
            "pending": false,
            "pending_transaction_id": null,
            "personal_finance_category": {
              "confidence_level": "VERY_HIGH",
              "detailed": "TRANSPORTATION_TAXIS_AND_RIDE_SHARES",
              "primary": "TRANSPORTATION"
            },
            "personal_finance_category_icon_url": "https://plaid-category-icons.plaid.com/PFC_TRANSPORTATION.png",
            "transaction_code": null,
            "transaction_id": "X4P76wMN15tlmpbbmDzRHgNMyk36jAHbZ4GvM",
            "transaction_type": "special",
            "unofficial_currency_code": null,
            "website": "uber.com",
            "id": "X4P76wMN15tlmpbbmDzRHgNMyk36jAHbZ4GvM",
            "currency": "GBP",
            "categories": ["Travel", "Taxi"]
          },
          {
            "account_id": "BpPGA58ql6fE4mLL4noJCJwLR6WZ6atzgqVGy",
            "account_owner": null,
            "amount": 5.4,
            "authorized_date": "2023-10-26",
            "authorized_datetime": null,
            "category": ["Travel", "Taxi"],
            "category_id": "22016000",
            "check_number": null,
            "counterparties": [
              {
                "confidence_level": "VERY_HIGH",
                "entity_id": "eyg8o776k0QmNgVpAmaQj4WgzW9Qzo6O51gdd",
                "logo_url": "https://plaid-merchant-logos.plaid.com/uber_1060.png",
                "name": "Uber",
                "type": "merchant",
                "website": "uber.com"
              }
            ],
            "date": "2023-10-27",
            "datetime": null,
            "iso_currency_code": "GBP",
            "location": {
              "address": null,
              "city": null,
              "country": null,
              "lat": null,
              "lon": null,
              "postal_code": null,
              "region": null,
              "store_number": null
            },
            "logo_url": "https://plaid-merchant-logos.plaid.com/uber_1060.png",
            "merchant_entity_id": "eyg8o776k0QmNgVpAmaQj4WgzW9Qzo6O51gdd",
            "merchant_name": "Uber",
            "name": "Uber 063015 SF**POOL**",
            "payment_channel": "online",
            "payment_meta": {
              "by_order_of": null,
              "payee": null,
              "payer": null,
              "payment_method": null,
              "payment_processor": null,
              "ppd_id": null,
              "reason": null,
              "reference_number": null
            },
            "pending": false,
            "pending_transaction_id": null,
            "personal_finance_category": {
              "confidence_level": "VERY_HIGH",
              "detailed": "TRANSPORTATION_TAXIS_AND_RIDE_SHARES",
              "primary": "TRANSPORTATION"
            },
            "personal_finance_category_icon_url": "https://plaid-category-icons.plaid.com/PFC_TRANSPORTATION.png",
            "transaction_code": null,
            "transaction_id": "Dg7b6wWrR5f5P6EEPz93CeBzJQAvx1c3DgbLm",
            "transaction_type": "special",
            "unofficial_currency_code": null,
            "website": "uber.com",
            "id": "Dg7b6wWrR5f5P6EEPz93CeBzJQAvx1c3DgbLm",
            "currency": "GBP",
            "categories": ["Travel", "Taxi"]
          },
          {
            "account_id": "BpPGA58ql6fE4mLL4noJCJwLR6WZ6atzgqVGy",
            "account_owner": null,
            "amount": 12,
            "authorized_date": "2023-10-24",
            "authorized_datetime": null,
            "category": ["Food and Drink", "Restaurants", "Fast Food"],
            "category_id": "13005032",
            "check_number": null,
            "counterparties": [
              {
                "confidence_level": "VERY_HIGH",
                "entity_id": "vzWXDWBjB06j5BJoD3Jo84OJZg7JJzmqOZA22",
                "logo_url": "https://plaid-merchant-logos.plaid.com/mcdonalds_619.png",
                "name": "McDonald's",
                "type": "merchant",
                "website": "mcdonalds.com"
              }
            ],
            "date": "2023-10-24",
            "datetime": null,
            "iso_currency_code": "GBP",
            "location": {
              "address": null,
              "city": null,
              "country": null,
              "lat": null,
              "lon": null,
              "postal_code": null,
              "region": null,
              "store_number": "3322"
            },
            "logo_url": "https://plaid-merchant-logos.plaid.com/mcdonalds_619.png",
            "merchant_entity_id": "vzWXDWBjB06j5BJoD3Jo84OJZg7JJzmqOZA22",
            "merchant_name": "McDonald's",
            "name": "McDonald's",
            "payment_channel": "in store",
            "payment_meta": {
              "by_order_of": null,
              "payee": null,
              "payer": null,
              "payment_method": null,
              "payment_processor": null,
              "ppd_id": null,
              "reason": null,
              "reference_number": null
            },
            "pending": false,
            "pending_transaction_id": null,
            "personal_finance_category": {
              "confidence_level": "VERY_HIGH",
              "detailed": "FOOD_AND_DRINK_FAST_FOOD",
              "primary": "FOOD_AND_DRINK"
            },
            "personal_finance_category_icon_url": "https://plaid-category-icons.plaid.com/PFC_FOOD_AND_DRINK.png",
            "transaction_code": null,
            "transaction_id": "wdEaw5pzAjiVQrGGQJ9wSb67BqrKlycPwvJ1r",
            "transaction_type": "place",
            "unofficial_currency_code": null,
            "website": "mcdonalds.com",
            "id": "wdEaw5pzAjiVQrGGQJ9wSb67BqrKlycPwvJ1r",
            "currency": "GBP",
            "categories": ["Food and Drink", "Restaurants", "Fast Food"]
          },
          {
            "account_id": "BpPGA58ql6fE4mLL4noJCJwLR6WZ6atzgqVGy",
            "account_owner": null,
            "amount": 4.33,
            "authorized_date": "2023-10-24",
            "authorized_datetime": null,
            "category": ["Food and Drink", "Restaurants", "Coffee Shop"],
            "category_id": "13005043",
            "check_number": null,
            "counterparties": [
              {
                "confidence_level": "VERY_HIGH",
                "entity_id": "NZAJQ5wYdo1W1p39X5q5gpb15OMe39pj4pJBb",
                "logo_url": "https://plaid-merchant-logos.plaid.com/starbucks_956.png",
                "name": "Starbucks",
                "type": "merchant",
                "website": "starbucks.com"
              }
            ],
            "date": "2023-10-24",
            "datetime": null,
            "iso_currency_code": "GBP",
            "location": {
              "address": null,
              "city": null,
              "country": null,
              "lat": null,
              "lon": null,
              "postal_code": null,
              "region": null,
              "store_number": null
            },
            "logo_url": "https://plaid-merchant-logos.plaid.com/starbucks_956.png",
            "merchant_entity_id": "NZAJQ5wYdo1W1p39X5q5gpb15OMe39pj4pJBb",
            "merchant_name": "Starbucks",
            "name": "Starbucks",
            "payment_channel": "in store",
            "payment_meta": {
              "by_order_of": null,
              "payee": null,
              "payer": null,
              "payment_method": null,
              "payment_processor": null,
              "ppd_id": null,
              "reason": null,
              "reference_number": null
            },
            "pending": false,
            "pending_transaction_id": null,
            "personal_finance_category": {
              "confidence_level": "VERY_HIGH",
              "detailed": "FOOD_AND_DRINK_COFFEE",
              "primary": "FOOD_AND_DRINK"
            },
            "personal_finance_category_icon_url": "https://plaid-category-icons.plaid.com/PFC_FOOD_AND_DRINK.png",
            "transaction_code": null,
            "transaction_id": "5dpeRVNwxgiEk4RRkDz5CdmJ7Nlq5Wt5lo9Q5",
            "transaction_type": "place",
            "unofficial_currency_code": null,
            "website": "starbucks.com",
            "id": "5dpeRVNwxgiEk4RRkDz5CdmJ7Nlq5Wt5lo9Q5",
            "currency": "GBP",
            "categories": ["Food and Drink", "Restaurants", "Coffee Shop"]
          },
          {
            "account_id": "BpPGA58ql6fE4mLL4noJCJwLR6WZ6atzgqVGy",
            "account_owner": null,
            "amount": 89.4,
            "authorized_date": "2023-10-22",
            "authorized_datetime": null,
            "category": ["Transfer", "Debit"],
            "category_id": "21006000",
            "check_number": null,
            "counterparties": [
              {
                "confidence_level": "LOW",
                "entity_id": null,
                "logo_url": null,
                "name": "FUN",
                "type": "merchant",
                "website": null
              }
            ],
            "date": "2023-10-23",
            "datetime": null,
            "iso_currency_code": "GBP",
            "location": {
              "address": null,
              "city": null,
              "country": null,
              "lat": null,
              "lon": null,
              "postal_code": null,
              "region": null,
              "store_number": null
            },
            "logo_url": null,
            "merchant_entity_id": null,
            "merchant_name": "FUN",
            "name": "SparkFun",
            "payment_channel": "in store",
            "payment_meta": {
              "by_order_of": null,
              "payee": null,
              "payer": null,
              "payment_method": null,
              "payment_processor": null,
              "ppd_id": null,
              "reason": null,
              "reference_number": null
            },
            "pending": false,
            "pending_transaction_id": null,
            "personal_finance_category": {
              "confidence_level": "LOW",
              "detailed": "GENERAL_MERCHANDISE_OTHER_GENERAL_MERCHANDISE",
              "primary": "GENERAL_MERCHANDISE"
            },
            "personal_finance_category_icon_url": "https://plaid-category-icons.plaid.com/PFC_GENERAL_MERCHANDISE.png",
            "transaction_code": null,
            "transaction_id": "JnLl6bzGa5F5MpDDMKLECjBogMbA1qFB3EmeQ",
            "transaction_type": "special",
            "unofficial_currency_code": null,
            "website": null,
            "id": "JnLl6bzGa5F5MpDDMKLECjBogMbA1qFB3EmeQ",
            "currency": "GBP",
            "categories": ["Transfer", "Debit"]
          }
        ],
      },
      {
        email: 'user2@example.com',
        password: await bcrypt.hash('password2', 10),
        firstName: 'Jane',
        lastName: 'Doe',
      },
      {
        email: 'user3@example.com',
        password: await bcrypt.hash('password3', 10),
        firstName: 'Bob',
        lastName: 'Smith',
      },
    ];

    await User.insertMany(usersToSeed);
    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

async function deleteDatabaseRecords() {
  try {
    await mongoose.connect(`mongodb://localhost:${DB_PORT}/${DB_NAME}`);
    await User.deleteMany({});
    console.log('Database reset successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    await mongoose.disconnect();
  }
}


const DB_PORT = Number(process.env.DB_PORT) || 27017;
const DB_NAME = process.env.DB_NAME || 'SpendTune';

async function resetDatabase() {
  mongoose.connect(`mongodb://localhost:${DB_PORT}/${DB_NAME}`);
  await deleteDatabaseRecords();
  await seedDatabase();
  await mongoose.disconnect();
}


resetDatabase();