const mongoose = require("mongoose");
const Profile = require("../models/Profile");
const Project = require("../models/Projects");
const {
    connectToDatabase,
    disconnectFromDatabase,
} = require("../config/database");

// Load environment variables
require("dotenv").config();

// Profile data
const profileData = {
    name: "Ryan Burns",
    title: "Full-Stack Web Developer",
    headshot: "/images/ryan.png",
    bio:
        "Full-Stack Web Developer with a background in Digital Consulting, " +
        "Restaurant Management, Security Systems, and Cabinetry. Passionate " +
        "about solving complex problems and using creativity to design and " +
        "build products that are elegant in both design and functionality. " +
        "A team player with excellent communication skills, a strong work " +
        "ethic, and a high aptitude for adapting, developing, and implementing " +
        "innovative solutions. Possesses a wealth of knowledge and experience " +
        "in business operations, team leadership, and talent identification " +
        "and development. Seeking a challenging and stimulating career in " +
        "the digital sphere to leverage past experience and a strong desire " +
        "to learn.",
    contactInfo: {
        email: "ryan.m.burns123@gmail.com",
        phone: "778-628-8346",
        linkedin: "https://www.linkedin.com/in/ryanburns604",
        github: "https://github.com/ryan-m-burns",
    },
};

// Seed data for projects
const projectsData = [
    {
        id: 1,
        title: "Project One",
        summary: "A JavaScript dungeon crawler.",
        description:
            "Fight your way through endless dungeons, " +
            "collecting treasure and defeating monsters. " +
            "Explore various levels and challenges as you " +
            "progress through the game.",
        tech: ["JavaScript", "jQuery", "CSS", "HTML"],
        screenshot: "/images/my_dungeon_crawler.png",
    },
    {
        id: 2,
        title: "Omit the Plates",
        summary: "An online food ordering app.",
        description:
            "Built a food ordering app inspired by SkipTheDishes using Node.js, Express.js, " +
            "jQuery, Sass, and HTML. Converted a multi-page framework into a single-page " +
            "app and integrated Twilio for text confirmations. Collaborated using GitHub " +
            "pull requests.",
        tech: ["NodeJS", "Express", "jQuery", "SASS"],
        screenshot: "/images/omit_the_plates_homepage.png",
    },
    {
        id: 3,
        title: "Harvest",
        summary:
            "A marketplace connecting farmers to the people in their community",
        description:
            "Created by Ryan Burns, Anouk Van Bogaert, and Taylor Smith.\n\n" +
            "Harvest is an online marketplace app that connects local farms to the people " +
            "in their community in one centralized place. Harvest makes it easy to find " +
            "high quality produce from local farms and your community, and build your own " +
            "custom box with only the produce you want.\n\n" +
            "Farms can sign up, list products and update stock of current products. " +
            "Shoppers can browse products from all the member farms at once, or filter by " +
            "Farm or by Category. They can add produce into their custom delivery box " +
            "and place an order to be delivered the following week!",
        tech: ["React", "Node.js", "Express", "PostgreSQL"],
        screenshot: "/images/harvest_landing_page.png",
    },
];

// Seed function
async function seedDatabase() {
    try {
        // Connect to database
        await connectToDatabase();

        // Clear existing data
        await Profile.deleteMany({});
        await Project.deleteMany({});

        console.log("Previous data cleared");

        // Seed profile data
        const profile = new Profile(profileData);
        await profile.save();
        console.log("Profile data seeded");

        // Seed projects data
        await Project.insertMany(projectsData);
        console.log("Projects data seeded");

        console.log("Database seeded successfully!");
    } catch (error) {
        console.error("Error seeding database:", error);
    } finally {
        // Disconnect from database
        await disconnectFromDatabase();
    }
}

// Run the seed function
seedDatabase();
