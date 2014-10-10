function DoubleMap() {
    if (!(this instanceof DoubleMap)) return new DoubleMap.apply(null, arguments);
    this.initialize.apply(this, arguments)
}

function appendRoutesCookie(a) {
    var c = getCookie("displayed_routes");
    setCookie("displayed_routes", c + a + ",", 30)
}

function popRoutesCookie(a) {
    var c = getCookie("displayed_routes");
    if (null != c) {
        for (var c = c.split(","), h = "", m = 0; m < c.length; m++) c[m] != a && "" != c[m] && (h = h + c[m] + ",");
        setCookie("displayed_routes", h, 30)
    }
}

function test_visibility(a) {
    var c = getCookie("displayed_routes");
    if (null == c) return !1;
    for (var c = c.split(","), h = 0; h < c.length; h++)
        if (c[h] == a) return !0;
    return !1
}

function setCookie(a, c, h) {
    var m = new Date;
    m.setDate(m.getDate() + h);
    c = escape(c) + (null == h ? "" : "; expires=" + m.toUTCString());
    document.cookie = a + "=" + c
}

function getCookie(a) {
    var c = document.cookie,
        h = c.indexOf(" " + a + "="); - 1 == h && (h = c.indexOf(a + "=")); - 1 == h ? c = null : (h = c.indexOf("=", h) + 1, a = c.indexOf(";", h), -1 == a && (a = c.length), c = unescape(c.substring(h, a)));
    return c
}
window.requestAnimFrame = function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame
}();
DoubleMap.prototype = function(a) {
    function c() {
        for (var d = window.location.hash.substring(1).split("&"), e = {}, b = 0; b < d.length; b++) {
            var l = d[b].indexOf("=");
            1 >= l ? e[d[b]] = "" : e[d[b].substring(0, l)] = d[b].substring(l + 1)
        }
        return e
    }

    function h() {
        9E5 < u ? (x = !1, n.timeOut && n.timeOut(function() {
            x = !0;
            y();
            setTimeout(h, 1E3);
            v()
        }), u = 0) : (u += 1E3, setTimeout(h, 1E3))
    }

    function m() {
        u = 0
    }

    function p(d, e, b, l) {
        var f = (b - d) * Math.PI / 180;
        e = (l - e) * Math.PI / 180;
        d = Math.sin(f / 2) * Math.sin(f / 2) + Math.cos(d * Math.PI / 180) * Math.cos(b * Math.PI / 180) * Math.sin(e /
            2) * Math.sin(e / 2);
        return 12742E3 * Math.atan2(Math.sqrt(d), Math.sqrt(1 - d))
    }

    function w(d, e, b, l) {
        var f = [d, e];
        if (4 > b.length) return f;
        for (var a = 0; a < b.length - 3; a += 2) {
            var g;
            g = b[a + 0];
            var c = b[a + 1],
                k = b[a + 2],
                h = b[a + 3];
            if (g == k && c == h) g = [g, c];
            else {
                var z = ((d - g) * (k - g) + (e - c) * (h - c)) / ((g - k) * (g - k) + (c - h) * (c - h));
                g = 0 > z ? [g, c] : 1 < z ? [k, h] : [g + z * (k - g), c + z * (h - c)]
            }
            c = p(d, e, g[0], g[1]);
            c < l && (f = g, l = c)
        }
        return f
    }

    function I(d, e) {
        for (var b = 0, l = e.length; b < l; b++)
            if (e[b] === d) {
                e.splice(b, 1);
                break
            }
        return e
    }
    var n, k, A, r = [],
        s = [],
        x = !0,
        E = !0,
        J = 300,
        q = [],
        t = [],
        B = [],
        T = [],
        K, M = [],
        U = [],
        C = !1,
        V = function() {
            var d = document.createElement("canvas");
            return !(!d.getContext || !d.getContext("2d"))
        }(),
        F = !1,
        W = function(d, e, b, l) {
            if (window.location.hash) {
                d = c();
                if (void 0 !== d.lat) {
                    var a = !0;
                    e = d.lat
                }
                void 0 !== d.lon && (b = d.lon);
                void 0 !== d.zoom && (l = d.zoom)
            }
            new L.tileLayer("//tiles.doublemap.com/dmtest/{z}/{x}/{y}.png");
            new L.tileLayer("http://otile1.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpg");
            new L.tileLayer("https://ssl-tiles.cloudmade.com/6407adc7f5fb49558f16bf8df0a504f5/119094/256/{z}/{x}/{y}.png", {
                attribution: 'Contains map data from <a href="http://openstreetmap.org/">OpenStreetMap</a>'
            });
            d = new L.tileLayer("https://api.tiles.mapbox.com/v3/erjiang.hk3an929/{z}/{x}/{y}.png32", {
                attribution: 'Base map data &copy; <a href="http://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            });
            var h = new L.tileLayer("https://api.tiles.mapbox.com/v3/erjiang.h6e947al/{z}/{x}/{y}.png32", {
                attribution: "Imagery by MapBox"
            });
            l = {
                zoom: l,
                center: [e, b],
                minZoom: 11,
                maxZoom: 17,
                layers: [d]
            };
            "showControls" in n && !1 === n.showControls &&
                (l.panControl = !1, l.zoomControl = !1, l.mapTypeControl = !1, l.scaleControl = !1, l.locateControl = !1);
            k = new L.map("map", l);
            k.attributionControl.setPrefix(!1);
            !1 !== l.mapTypeControl && L.control.layers({
                Roadmap: d,
                Satellite: h
            }).addTo(k);
            !1 !== l.locateControl && L.control.locate && L.control.locate().addTo(k);
            k.on("zoomstart", function() {
                E = !1
            });
            k.on("zoomend", function() {
                E = !0
            });
            !0 == a && (a = L.icon({
                iconUrl: "img/star_icon.png",
                iconSize: [22, 22],
                iconAnchor: [10, 10]
            }), L.marker([e, b], {
                icon: a
            }).addTo(k))
        },
        Y = function(d) {
            a.getJSON("v2/routes",
                function(d) {
                    for (var b = 0, a = null, f = 0, c = d.length; f < c; f++) {
                        var g = d[f];
                        q[g.id] = g;
                        t.push(g.id);
                        for (var h = [], m = 0, S = g.path.length; m < S; m += 2) h.push(new L.LatLng(g.path[m], g.path[m + 1]));
                        g.visible = n.embed ? !1 : n.passive ? !0 : !n.hideRoutes && !1 !== g.active && test_visibility(g.id);
                        g.visible && (b += 1);
                        g.polyline = new L.Polyline(h, {
                            color: "#" + g.color,
                            opacity: 0.6,
                            weight: 4
                        });
                        g.polyline.on("mouseover", function(b) {
                            return function() {
                                G(b, !0)
                            }
                        }(g.id));
                        g.polyline.on("mouseout", function(b) {
                            return function() {
                                G(b, !1)
                            }
                        }(g.id));
                        g.toggle =
                            function(b) {
                                return function(d) {
                                    b.visible = void 0 === d ? !b.visible : d;
                                    b.visible ? appendRoutesCookie(b.id) : popRoutesCookie(b.id);
                                    d = q[b.id];
                                    var e = !1 === b.visible ? k.removeLayer : k.addLayer;
                                    e.call(k, d.polyline);
                                    for (var a = d.stopIcons.length; a--;) void 0 !== d.stopIcons[a] && e.call(k, d.stopIcons[a]);
                                    for (var l in r) d = r[l], d.route == b.id && (b.visible ? k.addLayer(d.icon) : k.removeLayer(d.icon));
                                    u = 0;
                                    return b.visible
                                }
                            }(g);
                        n.addRoute(g, g.toggle);
                        g.visible && k.addLayer(g.polyline);
                        g.visible && n.embed && (null === a ? a = L.latLngBounds(g.polyline.getLatLngs()) :
                            a.extend(g.polyline.getLatLngs()))
                    }
                    null != a && k.fitBounds(a);
                    C ? n.setInitMenu(0 == b) : 0 == b && !0 !== n.embed && n.firstTime && n.firstTime();
                    X();
                    y(!1);
                    setTimeout(y, 1500);
                    void 0 === window.requestAnimFrame ? v() : window.requestAnimFrame(v)
                })
        },
        X = function() {
            a.getJSON("v2/stops", function(d) {
                for (var e = d.length, b; e--;) b = d[e], B[b.id] = b, T.push(b.id);
                for (var e = t.length, a, f; e--;)
                    for (f = q[t[e]], b = f.stops, a = b.length, d = f.stopIcons = []; a--;) d.push(Z(B[b[a]], q[t[e]], f.visible))
            })
        },
        Z = function() {
            var d = [];
            return function(a, b, l) {
                if (void 0 !==
                    a) {
                    var f = L.Marker,
                        c = new L.LatLng(a.lat, a.lon),
                        g = a.name,
                        h;
                    if (d[b.id]) h = d[b.id];
                    else {
                        h = b.id;
                        var m = L.icon,
                            q;
                        q = b.color;
                        if (!0 === V) {
                            var n = document.createElement("canvas");
                            n.setAttribute("width", 10);
                            n.setAttribute("height", 10);
                            var p = n.getContext("2d");
                            p.fillStyle = "#" + q;
                            p.beginPath();
                            p.arc(5, 5, 4.5, 2 * Math.PI, 0);
                            p.closePath();
                            p.fill();
                            p.stroke();
                            q = n.toDataURL()
                        } else q = "img/colorize?img=stop_icon&color=" + q;
                        h = d[h] = new m({
                            iconUrl: q,
                            iconSize: [10, 10],
                            iconAnchor: [5, 5]
                        })
                    }
                    f = new f(c, {
                        title: g,
                        icon: h
                    });
                    !1 !== l && f.addTo(k);
                    C ? aa(f, a, b) : ba(f, a, b);
                    return f
                }
            }
        }(),
        H = function(d, e) {
            a("ul.routes li").remove();
            a.each(t, function(b, l) {
                var f = q[l];
                a.each(f.stops, function(b, l) {
                    var c = B[l];
                    if (c.id == d) return a("ul.routes").append(_.template('<li class="<% if (route.id == r.id) { %>selected<% } %>"><a style="color: #<%= r.color %>" href="#" data-stop="<%= stop.id %>" data-route="<%= r.id %>"><%= r.short_name %></a></li>', {
                        route: q[e],
                        r: f,
                        stop: c
                    })), !1
                })
            })
        },
        ba = function(d, e, b) {
            d.on("click", function() {
                var l = _.template(K, {
                    stop: e,
                    route: b
                });
                k.setView(d.getLatLng(), 16);
                console.log("about to set infowindow");
                A.setContent(l).setLatLng(d.getLatLng()).openOn(k);
                H(e.id, b.id);
                D(e.id, b.id);
                a("ul.routes a").on("click", N);
                a("#stop-details h3 a").on("click", O)
            })
        },
        aa = function(d, e, b) {
            d.on("click", function() {
                a("#stop-details h3").html(_.template('<% if (stop.buddy != 0) { %><a href="#" data-buddy="<%= stop.buddy %>"><%= stop.name %></a><% } else { %><%= stop.name %><% } %>', {
                    stop: e
                }));
                k.setView(ca(d.getLatLng(), 16), 16);
                H(e.id, b.id);
                D(e.id, b.id);
                a("#advertisement-details").slideUp("slow");
                a("#stop-details").slideDown("slow");
                a("ul.routes a").on("click", N);
                a("#stop-details h3 a").on("click", O)
            })
        },
        ca = function(d, a) {
            return new L.LatLng(d.lat + (0.001 - 3E-4 * (a - 16)), d.lng)
        },
        O = function() {
            var d = a(this).data("buddy"),
                d = B[d],
                e = a("ul.routes li.selected a").data("route");
            a("#stop-details h3 a").data("buddy", d.buddy).text(d.name);
            H(d.id, e);
            D(d.id, e);
            P(d.id, e);
            return !1
        },
        N = function() {
            a("ul.routes li.selected").removeClass("selected");
            a(this).closest("li").addClass("selected");
            D(a(this).data("stop"),
                a(this).data("route"));
            P(a(this).data("stop"), a(this).data("route"));
            return !1
        },
        D = function(d, e) {
            "show_eta" in n && !0 === n.show_eta && (a("ul.etas li").remove(), a("ul.etas").append('<li class="waiting">Waiting for bus data...</li>'), a.getJSON("v2/eta?stop=" + d, function(b) {
                a("ul.etas li").remove();
                var l = q[e].color;
                _.each(b.etas[d].etas, function(b) {
                    b.route == e && (b.color = l, a("ul.etas").append(_.template('<li style="color: #<%= eta.color %>;"><% if (eta.avg-1 > 0) { %><%= (eta.avg-1) %>-<% } %><%= eta.avg %> min</li>', {
                        eta: b
                    })))
                })
            }))
        },
        y = function(d) {
            x && (!1 !== d && setTimeout(y, 2E3), a.getJSON("http://tufts.doublemap.com/map/v2/buses?jsoncallback=?", function(d) {
                for (var b, a, f = 0, c = d.length; f < c; f++) {
                    b = d[f];
                    if (a = r[b.id]) b.route != a.route ? (k.removeLayer(a.icon), delete r[b.id], I(b.id, s)) : (60 < b.lastUpdate - a.lastUpdate ? Q(a.id, b.lat, b.lon) : 300 < p(a.lat, a.lon, b.lat, b.lon) && Q(a.id, b.lat, b.lon), a.lat = b.lat, a.lon = b.lon, a.lastStop = b.lastStop, a.lastUpdate = b.lastUpdate), a.live = !0, q[b.route] && (!0 !== q[b.route].visible ? k.removeLayer(a.icon) : k.addLayer(a.icon));
                    if (void 0 === r[b.id]) {
                        b.ilat =
                            b.lat;
                        b.ilon = b.lon;
                        b.live = !0;
                        var g = a = r[b.id] = b,
                            h = void 0,
                            h = void 0 === q[g.route] ? "/dash/map/old/img/colorize?img=bus_icon&color=333333&annotate=" : "/dash/map/old/img/colorize?img=bus_icon&color=" + q[g.route].color + "&annotate=" + q[g.route].short_name,
                            h = new L.Marker([g.lat, g.lon], {
                                clickable: !1,
                                title: "Bus " + g.id,
                                icon: new L.Icon({
                                    iconUrl: h,
                                    iconSize: [23, 29],
                                    iconAnchor: [11, 29],
                                    shadowUrl: "/dash/map/img/bus_icon_shadow.png",
                                    shadowSize: [35, 29],
                                    shadowAnchor: [10, 28]
                                })
                            });
                        q[g.route].visible && h.addTo(k);
                        a.icon = h;
                        s.push(b.id)
                    }
                }
                f = 0;
                for (c = s.length; f <
                    c; f++)
                    if (b = r[s[f]]) !0 !== b.live ? (r[b.id] = void 0, k.removeLayer(b.icon), I(b.id, s), f--) : b.live = void 0
            }).fail(function() {
                a("#connection-message").show()
            }).success(function() {
                a("#connection-message").hide()
            }))
        },
        G = function(a, e) {
            var b = q[a],
                c = b.polyline;
            if (!0 === e) {
                if (c.setStyle({
                    opacity: 1,
                    weight: 6
                }), c.bringToFront(), void 0 !== b.stopIcons)
                    for (c = 0; c < b.stopIcons.length; c++) b.stopIcons[c].setZIndexOffset(1)
            } else if (c.setStyle({
                opacity: 0.6,
                weight: 4
            }), void 0 !== b.stopIcons)
                for (c = 0; c < b.stopIcons.length; c++) b.stopIcons[c].setZIndexOffset(0)
        },
        Q = function(a, e, b) {
            a = r[a];
            var c = q[a.route];
            c && !1 != c.visible || k.removeLayer(a.icon);
            void 0 === c ? (a.icon.setLatLng(new L.LatLng(e, b)), a.ilat = e, a.ilon = b) : (e = w(e, b, c.path, 80), a.icon.setLatLng(new L.LatLng(e[0], e[1])), a.ilat = e[0], a.ilon = e[1])
        },
        R = (new Date).getTime(),
        v = function() {
            var a = (new Date).getTime(),
                c = a - R,
                b = !1;
            R = a;
            if (x && (void 0 === window.requestAnimFrame ? setTimeout(v, J) : window.requestAnimFrame(v), E)) {
                a = c / 2E3;
                1 < a && (b = !0);
                for (var c = 0, h = s.length; c < h; c++) {
                    var f = r[s[c]],
                        k = q[f.route],
                        g = f.lat,
                        m = f.lon,
                        n = f.ilat,
                        p = f.ilon;
                    if (2E-5 < Math.abs(g - n) || 2E-5 < Math.abs(m - p)) b || F ? (f.ilat = g, f.ilon = m, void 0 === k ? f.icon.setLatLng(new L.LatLng(f.lat, f.lon)) : (k = w(n, p, k.path, 80), f.icon.setLatLng(new L.LatLng(k[0], k[1])))) : (n += (f.lat - n) * a, p += (f.lon - p) * a, void 0 === k ? f.icon.setLatLng(new L.LatLng(n, p)) : (k = w(n, p, k.path, 80), f.icon.setLatLng(new L.LatLng(k[0], k[1]))), f.ilat = n, f.ilon = p)
                }
                F = !1
            }
        },
        P = function(d, c) {
            a("ul.advertisements li").remove();
            a.ajax({
                url: "http://ads.doublemap.com/api/2//advertisements/premium?route_id=" + c + "&stop_id=" +
                    d,
                dataType: "jsonp"
            }).done(function(b) {
                a.each(b.advertisements, function(b, d) {
                    if ("undefined" == typeof M[d.id]) {
                        var c = d.venue,
                            e = new L.Marker({
                                position: [parseFloat(c.latitude), parseFloat(c.longitude)],
                                icon: c.logos.small
                            });
                        k.getZoom() >= d.zoom_level && e.addTo(k);
                        C ? da(d, e) : (c = _.template('<div id="advertisement-details" class="advertisement-info"><h3><%= venue.name %></h3><div class="info-row"><div class="info-label">Phone</div><div class="info-value highlight"><%= venue.phone %></div></div><div class="info-row"><div class="info-label">Address</div><div class="info-value"><%= venue.address %></div></div><div class="info-row"><div class="info-label">Website</div><div class="info-value"><a href="<%= venue.website %>" target="_blank"><%= venue.website.replace("http://", "").replace("https://", "") %></a></div></div><% if (venue.description != "") { %><div class="info-row"><div class="info-label">Description</div><div class="info-value"><%= venue.description %></div></div><% } %><% if (venue.notes != "") { %><div class="info-row"><div class="info-label">Notes</div><div class="info-value"><%= venue.notes %></div></div><% } %></div>', {
                            advertisement: d,
                            venue: c
                        }), ea(d, e, c));
                        U.push(d.id);
                        M[d.id] = {
                            advertisement: d,
                            marker: e
                        }
                    }
                    a("ul.advertisements").append(_.template('<li><a href="#" data-id="<%= advertisement.id %>"><img src="<%= advertisement.venue.logos.small %>" alt="<%= advertisement.venue.name %>" /></a></li>', {
                        advertisement: d
                    }))
                })
            })
        },
        ea = function(a, c, b) {
            c.on("click", function() {
                A.setContent(b);
                A.setLatLng(c.getLatLng()).openOn(k)
            })
        },
        da = function(d, c) {
            c.on("click", function() {
                var b = d.venue;
                a("#advertisement-details h3").text(b.name);
                a("#advertisement-phone .info-value").text(b.phone);
                a("#advertisement-address .info-value").text(b.address);
                a("#advertisement-website .info-value a").attr("href", b.website).text(b.website.replace(/^(http|https):\/\//, ""));
                a("#advertisement-description .info-value").text(b.description);
                "" == b.description ? a("#advertisement-description").hide() : a("#advertisement-description").show();
                a("#advertisement-notes .info-value").text(b.notes);
                "" == b.notes ? a("#advertisement-notes").hide() : a("#advertisement-notes").show();
                a("#stop-details").slideUp("slow");
                a("#advertisement-details").slideDown("slow")
            })
        },
        u = 0;
    return {
        initialize: function(d, c, b, l, f) {
            n = c;
            isNaN(f) && (f = 15);
            W(d, b, l, f);
            A = new L.popup;
            K = '<div id="stop-details" class="stop-info"><h3><% if (stop.buddy != 0) { %><a href="#" data-buddy="<%= stop.buddy %>"><%= stop.name %></a><% } else { %><%= stop.name %><% } %></h3>' + (!0 === n.show_eta ? '<div class="info-row"><div class="info-label">Routes</div><div class="info-value"><ul class="routes"></ul></div></div><div class="info-row"><div class="info-label">Next Buses</div><div class="info-value"><ul class="etas"></ul></div></div>' :
                "") + '<div class="info-row"><ul class="advertisements"></ul></div></div>';
            Y();
            k.on("click", m);
            k.on("move", m);
            k.on("zoom", m);
            k.on("mouseover", m);
            h();
            a(window).blur(function() {
                F = !0
            })
        },
        setTick: function(a) {
            J = a
        },
        setRoute: function(a, c) {
            void 0 !== c && (c = !!c);
            q[a].toggle(c)
        },
        setAllRoutes: function(a) {
            a = !!a;
            for (var c = 0; c < t.length; c++) q[t[c]].toggle(a)
        },
        highlightRoute: G,
        setMobile: function(a) {
            C = a
        }
    }
}(jQuery);
jQuery(function(a) {
    var c = a("#announcements");
    0 != c.length && a.getJSON("v2/announcements", function(h) {
        var m;
        if (0 == h.length) c.append(a("<em>").text("No new announcements"));
        else
            for (var p = 0, w = h.length; p < w; p++) m = h[p], c.append(a("<h3>").text(m.title)).append(a("<p>").text(m.message))
    })
});
var DMutil = {
    fillSysInfo: function(a) {
        var c = function(c, m) {
            var p = $('<input type="hidden" />');
            p.attr("name", c);
            p.val(m);
            a.append(p)
        };
        c("url", window.location);
        c("ua", navigator.userAgent);
        c("winWidth", window.innerWidth);
        c("winHeight", window.innerHeight);
        c("lang", navigator.language | navigator.userLanguage);
        c("scrWidth", screen.width);
        c("scrHeight", screen.height)
    }
};