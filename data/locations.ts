export const locationsByState: Record<string, string[]> = {
  "Andhra Pradesh":   ["Vijayawada", "Visakhapatnam", "Tirupati", "Guntur"],
  "Delhi":            ["New Delhi", "Noida", "Gurugram", "Faridabad"],
  "Gujarat":          ["Ahmedabad", "Surat", "Vadodara", "Rajkot"],
  "Haryana":          ["Gurugram", "Faridabad", "Hisar", "Rohtak"],
  "Karnataka":        ["Bengaluru", "Mysuru", "Hubli", "Mangaluru"],
  "Kerala":           ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur"],
  "Madhya Pradesh":   ["Bhopal", "Indore", "Jabalpur", "Gwalior"],
  "Maharashtra":      ["Mumbai", "Pune", "Nagpur", "Nashik", "Thane"],
  "Punjab":           ["Chandigarh", "Ludhiana", "Amritsar", "Jalandhar"],
  "Rajasthan":        ["Jaipur", "Jodhpur", "Udaipur", "Kota"],
  "Tamil Nadu":       ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli"],
  "Telangana":        ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar"],
  "Uttar Pradesh":    ["Lucknow", "Kanpur", "Agra", "Varanasi", "Noida"],
  "Uttarakhand":      ["Dehradun", "Haridwar", "Rishikesh", "Nainital"],
  "West Bengal":      ["Kolkata", "Howrah", "Durgapur", "Siliguri"],
  "Bihar":            ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur"],
  "Jharkhand":        ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro"],
  "Odisha":           ["Bhubaneswar", "Cuttack", "Rourkela", "Berhampur"],
  "Chhattisgarh":     ["Raipur", "Bhilai", "Bilaspur", "Korba"],
  "Assam":            ["Guwahati", "Silchar", "Dibrugarh", "Jorhat"],
};

export const allCities: string[] = Object.values(locationsByState).flat();

export const popularCities = [
  "Bengaluru", "Mumbai", "Delhi", "Hyderabad", "Pune",
  "Chennai", "Kolkata", "Ahmedabad", "Noida", "Gurugram",
];
