---
layout: note
title: "If You Bought AMZN Stocks Instead"
date: 2023-04-16
tags: [projects, finance, investing, tools]
---

This was originally published on 2019-06-25.

---

Have you ever wondered, what if I had used the money I spend shopping on Amazon on AMZN stock instead? Here's a gSheet tool that uses data exported from your Amazon account to calculate AMZN stock price on the day you bought something, how many shares you could have acquired, and how much the shares are worth today:

[If You Bought AMZN Stocks Instead](https://docs.google.com/spreadsheets/d/1jswNLD2J99liX14vyClqG51xtXeHCD7zPgXpCfuspUc/edit?usp=sharing)

Please be prepared to cry though. Sorry.

> EDIT on 2020-01-30: This project is on hiatus: The API I was using to pull historical/current stock data could not handle the load. Please give me a friendly nudge in the comments section if you are interested in this project!

## Now that you have made me cry, what's the point of this tool?

My financial independence-savvy friend [Louis](https://www.youtube.com/watch?v=hLVGK6G34Q8) and I often discuss how to shape human behavior for making better financial decisions. The fundamental tenets of saving a lot and investing wisely are easier said than done, and there seems to be a lack of tools that bring money down to a visceral level, and illustrate how small behavioral changes lead to cumulative effects. So I hope this gSheet can help you the way it has helped me realize the impact of daily spending.

## Projects are created from solving unexpected frustrations

If there's one takeaway from this post, it is that the challenges imagined (e.g. making a web app from scratch) are not as relevant towards finishing a project as the ones from breaking down what seemed to be a simple task into even finer details. In retrospect, these little frustrations are the reasons the tool does not exist yet. So I hope to share these challenges I faced in a list below, to inspire you (and my future self) to embrace little frustrations for your next project:

## Little Frustration 1: Getting historical stock prices for free

After some googling, I learned that historical stock data is a lucrative market, and companies like Yahoo! used to provide an API but ceded the way to paid providers. There are also Google Sheet plugins, but they are often freemium and I was concerned about security risks for my users. After some trial-and-error, I was able to get the data from Google Finance into the Google Sheet. I'm lucky that AMZN seems to work with some tweaking, but others aren't so lucky (there are weird data gaps) as shown in this Stack Overflow question. On the upside, I got to answer my first [Stack Overflow](https://stackoverflow.com/questions/55991372/how-to-get-historic-vix-data-in-google-spreadsheet/56177887#56177887) question ever.

## Little Frustration 2: Accounting for market closed days

This was an insidious issue that tripped me up the most—at first, I attributed errors in the gSheet to data source issues (see Little Frustration 1), but I noticed #REF errors only occurred on segments of consecutive days. It dawned on me that if one shopped on say, a Sunday, then there won't be a stock price for that day and the calculations would be off. This sent me down a rabbit hole of accounting for holidays, and "special" days like presidential funerals, natural disasters like Hurricane sandy, etc. A "market closed days" database did not seem to exist, and I ended up compiling the days myself as a reference, up to 1997 when AMZN IPO'd.

## Little Frustration 3: Calculating dividend

For those who are savvy about Amazon as a company, you may already know where this one is going. While I knew to pull stock prices from a database, I was also perplexed about how to calculate the dividend accumulation. This ended up a non-issue because...Amazon has posted no dividend yet.

## Little Frustration 4: Setting up SSL certificate for my own domain

I migrated my blog from bluehost to github pages to save a few bucks a month, and managed to set up the SSL certificate in the absence of cPanel. This was a painful process given the day and age of website hosting tools, though what was even more surprising is that someone else I knew encountered the same issue. I will write up a tutorial in a future post once I retrace my footsteps and clarify the pain points.

## Little Frustration 5: Documenting the project

I made this gSheet over a month ago and jotted a few bullets for this post, but did not made progress on it until a chat with a new friend last week. I think my impedance towards sharing stemmed from a lack of habit towards public writing, and fear of mistakes and criticism (as well as of being ignored) It's a constant reminder to myself that the people I admire the most, tend to document their work and share their thoughts regardless of audience feedback. Nonetheless, I would love to hear from you about the tool and the post, so I can improve in the future.

---

Originally published at [christinchong.com](http://christinchong.com/) on June 25, 2019.
