export interface category {
    id: string,
    api: string,
    name: string
}

export const PodcastCategories : Array<category> = [
    { id: "01-00", api: "Arts", name: "Arts" },
    { id: "01-01", api: "Design", name: "Arts > Design" },
    { id: "01-02", api: "Fashion and Beauty", name: "Arts > Fashion & Beauty" },
    { id: "01-03", api: "Foods", name: "Arts > Food" },
    { id: "01-04", api: "Books", name: "Arts > Books" },
    { id: "01-05", api: "Performing Arts", name: "Arts > Performing Arts" },
    { id: "01-06", api: "Visual Arts", name: "Arts > Visual Arts" },
    
    { id: "02-00", api: "Business", name: "Business" },
    { id: "02-02", api: "Careers", name: "Business > Careers" },
    { id: "02-03", api: "Investing", name: "Business > Investing" },
    { id: "02-04", api: "Management", name: "Business > Management" },
    { id: "02-06", api: "Entrepreneurship", name: "Business > Entrepreneurship" },
    { id: "02-07", api: "Marketing", name: "Business > Marketing" },
    { id: "02-08", api: "Non-Profit", name: "Business > Non-Profit" },

    { id: "03-00", api: "Comedy", name: "Comedy" },
    { id: "03-01", api: "Comedy Interviews", name: "Comedy > Comedy Interviews" },
    { id: "03-02", api: "Improv", name: "Comedy > Improv" },
    { id: "03-03", api: "Stand-Up", name: "Comedy > Stand-Up" },

    { id: "04-00", api: "Education", name: "Education" },
    { id: "04-04", api: "Language Learning", name: "Education > Language Learning" },
    { id: "04-05", api: "Courses", name: "Education > Courses" },
    { id: "04-06", api: "How To", name: "Education > How To" },
    { id: "04-07", api: "Self-Improvement", name: "Education > Self-Improvement" },

    { id: "20-00", api: "Fiction", name: "Fiction" },
    { id: "20-01", api: "Comedy Fiction", name: "Fiction > Comedy Fiction" },
    { id: "20-02", api: "Drama", name: "Fiction > Drama" },
    { id: "20-03", api: "Science Fiction", name: "Fiction > Science Fiction" },

    { id: "06-00", api: "Government", name: "Government"},

    { id: "30-00", api: "History", name: "History" },

    { id: "07-00", api: "Health and Fitness", name: "Health & Fitness" },
    { id: "07-01", api: "Alternative Health", name: "Health & Fitness > Alternative Health" },
    { id: "07-02", api: "Fitness", name: "Health & Fitness > Fitness" },
    { id: "07-04", api: "Sexuality", name: "Health & Fitness > Sexuality" },
    { id: "07-05", api: "Medicine", name: "Health & Fitness > Medicine" },
    { id: "07-06", api: "Mental Health", name: "Health & Fitness > Mental Health" },
    { id: "07-07", api: "Nutrition", name: "Health & Fitness > Nutrition" },

    { id: "08-00", api: "Kids and Family", name: "Kids & Family" },
    { id: "08-01", api: "Education for Kids", name: "Kids & Family > Education for Kids" },
    { id: "08-02", api: "Parenting", name: "Kids & Family > Parenting" },
    { id: "08-03", api: "Pets and Animals", name: "Kids & Family > Pets & Animals" },
    { id: "08-04", api: "Stories for Kids", name: "Kids & Family > Stories for Kids" },

    { id: "40-00", api: "Leisure", name: "Leisure" },
    { id: "40-01", api: "Animation and Manga", name: "Leisure > Animation & Manga" },
    { id: "40-02", api: "Automotive", name: "Leisure > Automotive" },
    { id: "40-03", api: "Aviation", name: "Leisure > Aviation" },
    { id: "40-04", api: "Crafts", name: "Leisure > Crafts" },
    { id: "40-05", api: "Games", name: "Leisure > Games" },
    { id: "40-06", api: "Hobbies", name: "Leisure > Hobbies" },
    { id: "40-07", api: "Home and Garden", name: "Leisure > Home & Garden" },
    { id: "40-08", api: "Video Games", name: "Leisure > Video Games" },

    { id: "09-00", api: "Music", name: "Music" },
    { id: "09-01", api: "Music Commentary", name: "Music > Music Commentary" },
    { id: "09-02", api: "Music History", name: "Music > Music History" },
    { id: "09-03", api: "Music Interviews", name: "Music > Music Interviews" },

    { id: "10-00", api: "News", name: "News" },
    { id: "10-01", api: "Business News", name: "News > Business News" },
    { id: "10-02", api: "Daily News", name: "News > Daily News" },
    { id: "10-03", api: "Entertainment News", name: "News > Entertainment News" },
    { id: "10-04", api: "News Commentary", name: "News > News Commentary" },
    { id: "10-05", api: "Politics", name: "News > Politics" },
    { id: "10-06", api: "Sports News", name: "News > Sports News" },
    { id: "10-07", api: "Tech News", name: "News > Tech News" },

    { id: "11-00", api: "Religion and Spirituality", name: "Religion & Spirituality" },
    { id: "11-01", api: "Buddhism", name: "Religion & Spirituality > Buddhism" },
    { id: "11-02", api: "Christianity", name: "Religion & Spirituality > Christianity" },
    { id: "11-03", api: "Hinduism", name: "Religion & Spirituality > Hinduism" },
    { id: "11-04", api: "Islam", name: "Religion & Spirituality > Islam" },
    { id: "11-05", api: "Judaism", name: "Religion & Spirituality > Judaism" },
    { id: "11-06", api: "Religion", name: "Religion & Spirituality > Religion" },
    { id: "11-07", api: "Spirituality", name: "Religion & Spirituality > Spirituality" },

    { id: "12-00", api: "Science", name: "Science" },
    { id: "12-02", api: "Natural Sciences", name: "Science > Natural Sciences" },
    { id: "12-03", api: "Social Sciences", name: "Science > Social Sciences" },
    { id: "12-04", api: "Astronomy", name: "Science > Astronomy" },
    { id: "12-05", api: "Chemistry", name: "Science > Chemistry" },
    { id: "12-06", api: "Earth Sciences", name: "Science > Earth Sciences" },
    { id: "12-07", api: "Life Sciences", name: "Science > Life Sciences" },
    { id: "12-08", api: "Mathematics", name: "Science > Mathematics" },
    { id: "12-09", api: "Nature", name: "Science > Nature" },
    { id: "12-10", api: "Physics", name: "Science > Physics" },

    { id: "13-00", api: "Society and Culture", name: "Society & Culture" },
    { id: "13-02", api: "Personal Journals", name: "Society & Culture > Personal Journals" },
    { id: "13-03", api: "Philosophy", name: "Society & Culture > Philosophy" },
    { id: "13-04", api: "Places and Travel", name: "Society & Culture > Places & Travel" },
    { id: "13-05", api: "Relationships", name: "Society & Culture > Relationships" },
    { id: "13-06", api: "Documentary", name: "Society & Culture > Documentary" },

    { id: "14-00", api: "Sports", name: "Sports" },
    { id: "14-05", api: "Baseball", name: "Sports > Baseball" },
    { id: "14-06", api: "Basketball", name: "Sports > Basketball" },
    { id: "14-07", api: "Cricket", name: "Sports > Cricket" },
    { id: "14-08", api: "Fantasy Sports", name: "Sports > Fantasy Sports" },
    { id: "14-09", api: "Football", name: "Sports > Football" },
    { id: "14-10", api: "Golf", name: "Sports > Golf" },
    { id: "14-11", api: "Hockey", name: "Sports > Hockey" },
    { id: "14-12", api: "Rugby", name: "Sports > Rugby" },
    { id: "14-13", api: "Running", name: "Sports > Running" },
    { id: "14-14", api: "Soccer", name: "Sports > Soccer" },
    { id: "14-15", api: "Swimming", name: "Sports > Swimming" },
    { id: "14-16", api: "Tennis", name: "Sports > Tennis" },
    { id: "14-17", api: "Volleyball", name: "Sports > Volleyball" },
    { id: "14-18", api: "Wilderness", name: "Sports > Wilderness" },
    { id: "14-19", api: "Wrestling", name: "Sports > Wrestling" },

    { id: "15-00", api: "Technology", name: "Technology" },

    { id: "50-00", api: "True Crime", name: "True Crime" },

    { id: "16-00", api: "TV and Film", name: "TV & Film" },
    { id: "16-01", api: "After Shows", name: "TV & Film > After Shows" },
    { id: "16-02", api: "Film History", name: "TV & Film > Film History" },
    { id: "16-03", api: "Film Interviews", name: "TV & Film > Film Interviews" },
    { id: "16-04", api: "Film Reviews", name: "TV & Film > Film Reviews" },
    { id: "16-05", api: "TV Reviews", name: "TV & Film > TV Reviews" }
]

export const findCategories = (categoriesArray : string[]) : category | null => {
    if (categoriesArray.length > 0) {
        if (Array.isArray(categoriesArray[0]) && categoriesArray[0].length > 0) {
            let value : string = categoriesArray[0][0];
            if (categoriesArray[0].length === 2) {
                value = value + ' > ' + categoriesArray[0][1];
            }
            const category = PodcastCategories.find((item) => item.name === value);
            if (category)
                return category;
        }
    }
    return null;
}