const projects = [
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

module.exports = projects;
