import requests
import pandas as pd

# Nutritionix API credentials (get free key from nutritionix.com)
APP_ID = "your_app_id"
API_KEY = "your_api_key"

# Recommended daily intake for pregnancy (approx values)
recommended_intake = {
    "calories": 2400,
    "protein": 75,
    "fat": 70,
    "carbohydrates": 300,
    "fiber": 28,
    "calcium": 1200,
    "iron": 27,
    "folate": 600  # in mcg
}

def get_nutrition(food_item):
    url = "https://trackapi.nutritionix.com/v2/natural/nutrients"
    headers = {
        "x-app-id": APP_ID,
        "x-app-key": API_KEY,
        "Content-Type": "application/json"
    }
    data = {
        "query": food_item,
        "timezone": "US/Eastern"
    }

    response = requests.post(url, headers=headers, json=data)
    if response.status_code == 200:
        nutrients = response.json()["foods"][0]
        return {
            "food": food_item,
            "calories": nutrients.get("nf_calories", 0),
            "protein": nutrients.get("nf_protein", 0),
            "fat": nutrients.get("nf_total_fat", 0),
            "carbohydrates": nutrients.get("nf_total_carbohydrate", 0),
            "fiber": nutrients.get("nf_dietary_fiber", 0),
            "calcium": nutrients.get("full_nutrients", [{}])[0].get("value", 0),  # You can map properly
            "iron": next((x["value"] for x in nutrients["full_nutrients"] if x["attr_id"] == 303), 0)
        }
    else:
        return None

# Take user input
foods = input("Enter the foods you ate today (comma separated): ").split(",")

nutrition_data = []
for food in foods:
    food = food.strip()
    info = get_nutrition(food)
    if info:
        nutrition_data.append(info)

# Convert to DataFrame
df = pd.DataFrame(nutrition_data)
print("\nYour Food Nutrition Data:\n", df)

# Calculate totals
totals = df.drop(columns="food").sum().to_dict()
print("\nTotal Nutrients Today:\n", totals)

# Compare with recommended
print("\nAnalysis and Suggestions:")
for nutrient, rec_value in recommended_intake.items():
    user_value = totals.get(nutrient, 0)
    if user_value < rec_value * 0.9:
        print(f"⚠️ You need more {nutrient}. Try adding foods rich in {nutrient}.")
    elif user_value > rec_value * 1.2:
        print(f"⚠️ You are consuming too much {nutrient}. Reduce high {nutrient} foods.")
    else:
        print(f"✅ {nutrient} intake is good.")
