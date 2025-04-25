# Social Media Dashboard

## Description

A lightweight social media dashboard where users can track analytics from various social media platforms.

## TODO

### DEV

#### General

- Deploy
- README structure
- Git hooks
- CI/CD
- PlantUML diagrams
- Containerization
- file names linting?
- SonarQube?

#### Frontend

- Confirm password logic

#### Backend

- Confirm password logic 
- Sanitization
- Role-based auth (https://docs.nestjs.com/guards#role-based-authentication)
- Data Storage (Redis)
- Traffic Management
- Cron Jobs
- Nginx
- Testing
- Compression
- Database Query Optimization
- Update local postgres version
- Nests.js Microservices
- Rewrite auth to passport?

### APP FEATURES

#### 1. Account analytics

**Main:**
- [x] total number of posts 
- [x] user profile picture

**Additional:**
- [ ] total number of followers
- [ ] total number of the followed
- [ ] most popular posts / photos
- [ ] weekly increase in followers
- [ ] weekly increase in followed
- [ ] weekly increase in likes
- [ ] weekly increase in comments
- [ ] daily / monthly / yearly follower growth (increase or decrease)
- [ ] daily / monthly / yearly followed growth (increase or decrease)
- [ ] daily / monthly / yearly likes growth
- [ ] daily / monthly / yearly comments growth

#### 2. Post Analytics

**Main:**
- [ ] ...

**Additional:**
- [ ] followers reach rate*
- [ ] post reach per day / month / year
- [ ] positive and negative reactions per day / month / year
- [ ] comments per day / month / year
- [ ] reposts / shares per day / month / year
- [ ] text messages
- [ ] reach by media product type for last 30 days (posts, stories, reels, other)

#### 3. Audience Insights

**Main:**
- [ ] language preference

**Additional:**
- [ ] time of day activity
- [ ] followers by location (country / city)
- [ ] followers by age group
- [ ] followers by gender
- [ ] most popular content by country
- [ ] most popular content by age group
- [ ] most popular content by gender

#### 4. Content Overview

**Main:**
- [x] title
- [x] description
- [x] photo
- [x] date
- [x] number of comments

**Additional:**
- [ ] number of views
- [ ] number of likes

*followers reach rate is the total reach of page followers during the last 30 days divided by the current total number of followers. The closer this metric is to 100% the better
