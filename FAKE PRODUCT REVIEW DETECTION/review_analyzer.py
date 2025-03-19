from textblob import TextBlob
import pandas as pd
import re

def calculate_review_authenticity(review):
    # Initialize scoring factors
    score = 0
    
    # Check review length (longer reviews tend to be more genuine)
    if len(review) > 200:
        score += 0.2
    elif len(review) > 100:
        score += 0.1
        
    # Check for excessive punctuation
    exclamation_count = review.count('!')
    if exclamation_count > 3:
        score -= 0.1
    
    # Check for URL presence (spam reviews often contain URLs)
    if 'http' in review.lower() or 'www' in review.lower():
        score -= 0.2
        
    # Check for emotional balance using TextBlob
    blob = TextBlob(review)
    polarity = abs(blob.sentiment.polarity)
    if polarity > 0.8:  # Extremely positive/negative reviews are suspicious
        score -= 0.1
    
    # Check for specific promotional phrases
    promo_phrases = ['check out', 'click here', 'buy now', 'money back', 'free sample']
    for phrase in promo_phrases:
        if phrase in review.lower():
            score -= 0.15
            
    # Convert score to percentage and ensure it stays within 0-100
    genuine_percent = (score + 0.5) * 100  # Normalize to 0-100 scale
    genuine_percent = max(0, min(100, genuine_percent))
    fake_percent = 100 - genuine_percent
    
    return round(genuine_percent, 2), round(fake_percent, 2)

def analyze_reviews(file_path):
    # Read TSV file
    df = pd.read_csv(file_path, sep='\t')
    
    # Calculate authenticity for each review
    results = []
    total_genuine = 0
    total_fake = 0
    
    print("\nOverall Analysis Results:")
    print("-----------------------")
    
    # Process each review
    for idx, row in df.iterrows():
        review_text = str(row['REVIEW_TEXT'])
        genuine_percent, fake_percent = calculate_review_authenticity(review_text)
        
        total_genuine += genuine_percent
        total_fake += fake_percent
        
        results.append({
            'DOC_ID': row['DOC_ID'],
            'REVIEW_TITLE': row['REVIEW_TITLE'],
            'GENUINE_PERCENT': genuine_percent,
            'FAKE_PERCENT': fake_percent
        })
    
    # Calculate overall percentages
    avg_genuine = total_genuine / len(df)
    avg_fake = total_fake / len(df)
    
    print(f"Combined Genuine Percentage: {round(avg_genuine, 2)}%")
    print(f"Combined Fake Percentage: {round(avg_fake, 2)}%")
    
    print("\nIndividual Review Analysis:")
    print("-------------------------")
    
    # Print individual review results
    for result in results:
        print(f"\nReview #{result['DOC_ID']}: {result['REVIEW_TITLE']}")
        print(f"Genuine: {result['GENUINE_PERCENT']}%")
        print(f"Fake: {result['FAKE_PERCENT']}%")

if __name__ == "__main__":
    file_path = "c:/Users/pardh/OneDrive/Desktop/fprd2/amazon_reviews.txt"
    analyze_reviews(file_path)
