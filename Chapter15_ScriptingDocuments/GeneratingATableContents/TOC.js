"use strict";

onLoad(function () {
        var toc = document.getElementById("TOC");
        if (!toc) {
            toc = document.createElement("div");
            toc.id = "TOC";
            document.body.insertBefore(toc, document.body.firstChild);
        }
        var headings;
        headings = document.querySelectorAll("h1,h2,h3,h4,h5,h6");
        var sectionNumbers = [0, 0, 0, 0, 0, 0];
        for (var h = 0; h < headings.length; h++) {
            var heading = headings[h];
            if (heading.parentNode === toc) continue;
            var level = parseInt(heading.tagName.charAt(1));
            sectionNumbers[level - 1]++;
            for (var i = level; i < 6; i++) {
                sectionNumbers[i] = 0;
            }

            // decorate heading
            var sectionNumber = sectionNumbers.slice(0, level).join(".");
            var span = document.createElement("span");
            span.className = "TOCSectNum";
            span.innerHTML = sectionNumber;
            heading.insertBefore(span, heading.firstChild);

            var anchor = document.createElement("a");
            anchor.name = "TOC" + sectionNumber;
            heading.parentNode.insertBefore(anchor, heading);
            anchor.appendChild(heading);

            // create TOC
            var link = document.createElement("a");
            link.href = "#TOC" + sectionNumber;
            link.innerHTML = heading.innerHTML;

            var entry = document.createElement("div");
            entry.className = "TOCEntry TOCLevel" + level;
            entry.appendChild(link);

            toc.appendChild(entry);
        }
    }
);

