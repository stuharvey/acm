var docpadConfig,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };


// The DocPad Configuration File
docpadConfig = {
    
    // generated site at the root
    // --------------------------
    // outputPath: '.'

    // Template Data
    // -------------
        
    // These are variables that will be accessible via our templates
    // To access one of these within our templates, refer to the FAQ: https://github.com/bevry/docpad/wiki/FAQ
    templateData: {

        //
        // All officers associated with ACM.
        //
        officers: {

            president : {
                name: "Chip Senkbeil",
                role: "President",
                email: "rcsvt@vt.edu",
                picture: "/images/officers/chip_senkbeil.jpg",
                bio: "\"To me programming is more than an important practical art. It is also a gigantic undertaking in the foundations of knowledge.\" ~Grace Hopper"
            },

            vice_president : {
                name: "Zack Morris",
                role: "Vice President",
                email: "zackmorris@vt.edu",
                picture: "/images/officers/zack_morris.png",
                bio: "I am a senior majoring in computer science and mathematics. You can find me loitering around the CS lounge with Chip."
            },

            treasurer : {
                name: "Hasan Afzal",
                role: "Treasurer",
                email: "hasan91@vt.edu",
                picture: "/images/officers/hasan_afzal.jpg",
                bio: "I am a Senior majoring in Computer Science and graduating in May 2014. I am originally from Richmond, VA and have interned at Amazon and Genworth Financial."

            },

            secretary : {
                name: "",
                role: "Secretary",
                email: "",
                picture: "/images/officers/officer_placeholder.jpg",
                bio: "Seeking new student!"
            },

            event_coordinator : {
                name: "",
                role: "Event Coordinator",
                email: "",
                picture: "/images/officers/officer_placeholder.jpg",
                bio: "Seeking new student!"
            },

            webmaster : {
                name: "Chip Senkbeil",
                role: "Webmaster",
                email: "rcsvt@vt.edu",
                picture: "/images/officers/chip_senkbeil.jpg",
                bio: "Seeking replacement!"
            }
        },
        
        // Specify some site properties
        site: {
            
            // The production url of our website
            url: "http://www.acm.vt.edu/",
    
            // The default title of our website
            title: "ACM Virginia Tech",
                
            // The website description (for SEO)
            description: "The Virginia Tech chapter of the Association for Computing Machinery",
            
            // The website keywords (for SEO) separated by commas
            keywords: "acm, vt, virginia, tech, association, for, computing, machinery, computer, science, engineering, software, mobile, web, php, javascript, java, c, cpp, hackathon, raspberry, pi",
                
            // The website author's name
            author: "Chip Senkbeil",
            
            // The website author's email
            email: "rcsvt@vt.edu",

            // The associated CSS styles
            styles: [
                "/styles/style.css"
            ],

            // The associated scripts
            scripts: [
                "/scripts/acm_datetime.js",
                "/scripts/acm_calendar.js",
                "/scripts/acm_core.js"
            ]
            
        },
    
        // Helper Functions
        // ----------------
    
        // Get the prepared site/document title
        // Often we would like to specify particular formatting to our page's title
        // we can apply that formatting here
        getPreparedTitle: function() {
            
            if (this.document.title) {
                // if we have a document title, then we should use that and suffix the site's title onto it
                return "" + this.document.title + " | " + this.site.title;
            } else {
                // if our document does not have it's own title, then we should just use the site's title
                return this.site.title;
            }
        },
        
        // Get the prepared site/document description
        getPreparedDescription: function() {
            // if we have a document description, then we should use that, otherwise use the site's description
            return this.document.description || this.site.description;
        },
        
        // Get the prepared site/document keywords
        getPreparedKeywords: function() {
            // Merge the document keywords with the site keywords
            return this.site.keywords.concat(this.document.keywords || []).join(', ');
        }
        
    },
    
    // Collections
    // -----------
    // These are special collections that 
    // our website makes available to us
    
    collections: {
        
        // For instance, this one will fetch in all documents that have pageOrder set within their meta data
        pages: function(database) {
            return database.findAllLive({
                pageOrder: {
                    $exists: true
                }
            }, [
                {
                    pageOrder: 1,
                    title: 1
                }
            ]);
        },
        
        // This one, will fetch in all documents that have the tag "post" specified in their meta data
        posts: function(database) {
            return database.findAllLive({
                tags: {
                    $has: ['post']
                }
            }, [
                {
                    date: -1
                }
            ]);
        }
    }
    
};

// Export our DocPad Configuration
module.exports = docpadConfig;
