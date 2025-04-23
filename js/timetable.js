function construstTimeTable(timeTable, talksData) {
    return Object.keys(timeTable)
        .filter(function (k) { return timeTable[k]; })
        .sort()
        .map(function (time) {
            console.log(time);
            var name = timeTable[time];
            console.log(name);

            var index = 0;
            var talk = talksData.filter(function (t) { return t.name.indexOf(name) == 0; })[index];
            console.log(talk)
            // 何部目か判定
            if (
                (name == "第1部") ||
                (name == "第2部") ||
                (name == "第3部") ||
                (name == "第4部")
            ) {
                return { time: name, name: "", title: "", major: "" };
            }
            // 改行
            else if (name == "改行") {
                return { time: "\xa0", name: "\xa0", title: "", major: "" };
            }
            // 休憩・座談会
            else if (name.indexOf("休憩・座談会") == 0) {
                return { time: time, name: "", title: name, major: "" };
            }
            // そのほか(複数講演がある場合など)はここに追加
            // 講演
            else {
                return { time: time, name: talk.name, title: talk.title, major: talk.affiliation };
            }
        });
}


$(function () {
    var DayTable1 = construstTimeTable(day1, data);
    var DayTable2 = construstTimeTable(day2, data);
    // var DayTable3  = construstTimeTable(day3, data);

    var template = $('#template').html();
    Mustache.parse(template);
    var rendered1 = Mustache.render(template, { table: DayTable1, header: "5/24 (土)" });
    var rendered2 = Mustache.render(template, { table: DayTable2, header: "5/25 (日)" });
    // var rendered3  = Mustache.render(template, {table: DayTable3,  header: "11/20 (日)"});
    // $('.article-headline').html(rendered1 + "<br />" + rendered2 + "<br />" + rendered3);
    $('.article-headline').html(rendered1 + "<br />" + rendered2);
});
