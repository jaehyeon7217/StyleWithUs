package com.ssafy.style.service.impl;

import com.ssafy.style.data.dto.DataDto;
import com.ssafy.style.data.dto.UserDto;
import com.ssafy.style.service.DataService;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class DataServiceImpl implements DataService {

    @Override
    public List<DataDto> getData(String no) {

        String URL = "https://www.musinsa.com/categories/item/" + no; // 원하는 url

        return startData(URL, 1);

    }

    @Override
    public List<DataDto> getWData(String no) {
        String URL = "https://www.wconcept.co.kr/Women/" + no; // 원하는 url
        Document doc;
        List<DataDto> list = new ArrayList<>();

        try {
            doc = Jsoup.connect(URL)
                    .userAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.152 Safari/537.36")
                    .get(); // 원하는 url에서 전체 구조를 받아온다

            if(doc.select("#container > div > div.thumbnail_list > ul > li:nth-child(1)").toString().equals(""))
                return null;

            for(int i=1;i<=90;i++) {
                DataDto data = new DataDto();

                data.setNo(i);

                Elements el = doc.select("#container > div > div.thumbnail_list > ul > li:nth-child("+i+") > a > div.text.max > div.price > span.discount_rate");
                if(!el.text().equals("")) {
                    data.setSale(el.text());
                    data.setBeforePrice(doc.select("#container > div > div.thumbnail_list > ul > li:nth-child("+i+") > a > div.text.max > div.price > span.base_price").text());
                    data.setAfterPrice(doc.select("#container > div > div.thumbnail_list > ul > li:nth-child("+i+") > a > div.text.max > div.price > span.discount_price").text());
                }
                else
                    data.setAfterPrice(doc.select("#container > div > div.thumbnail_list > ul > li:nth-child("+i+") > a > div.text.max > div.price > span").text());

                data.setImgLink(doc.select("#container > div > div.thumbnail_list > ul > li:nth-child("+i+") > a > div.img > img").attr("abs:src"));
                data.setMaker(doc.select("#container > div > div.thumbnail_list > ul > li:nth-child("+i+") > a > div.text.max > div.text_wrap > div.brand").text());
                data.setLink(doc.select("#container > div > div.thumbnail_list > ul > li:nth-child("+i+") > a").attr("abs:href"));
                data.setTitle(doc.select("#container > div > div.thumbnail_list > ul > li:nth-child("+i+") > a > div.text.max > div.text_wrap > div.product.ellipsis.multiline").text());

                list.add(data);
            }

            return list;

        } catch (IOException e) {
            e.printStackTrace();
        }

        return null;
    }

    @Override
    public List<DataDto> getCommendTopItem(UserDto userInfo) {

        int should = userInfo.getUserShoulder();
        int chest = userInfo.getUserChest();
        int sleeve = userInfo.getUserSleeve();

        String URL = "https://www.musinsa.com/categories/item/001?measure=" +
                "measure_3%5E" + (should - 2) + "%5E" + (should + 2) +
                "%2Cmeasure_1%5E" + (chest - 2) + "%5E" + (chest + 2) +
                "%2Cmeasure_2%5E" + (sleeve - 2) + "%5E" + (sleeve + 2);

        System.out.println("URL : " + URL);

        return startData(URL, userInfo.getUserGender());
    }

    @Override
    public List<DataDto> getCommendBottomItem(UserDto userInfo) {

        int waist = userInfo.getUserWaist();
        int hip = userInfo.getUserHip();
        int thigh = userInfo.getUserThigh();
        int hem = userInfo.getUserHem();

        String URL = "https://www.musinsa.com/categories/item/003?measure=" +
                "measure_9%5E" + (waist - 2) + "%5E" + (waist + 2) +
                "%2Cmeasure_8%5E" + (hip - 2) + "%5E" + (hip + 2) +
                "%2Cmeasure_10%5E" + (thigh - 1) + "%5E" + (thigh + 1)+
                "%2Cmeasure_6%5E" + (hem - 1) + "%5E" + (hem + 1);

        return startData(URL, userInfo.getUserGender());
    }

    @Override
    public List<DataDto> getCommendOuterItem(UserDto userInfo) {

        int should = userInfo.getUserShoulder();
        int chest = userInfo.getUserChest();
        int sleeve = userInfo.getUserSleeve();

        String URL = "https://www.musinsa.com/categories/item/002?measure=" +
                "measure_3%5E" + (should - 5) + "%5E" + (should + 5) +
                "%2Cmeasure_1%5E" + (chest - 5) + "%5E" + (chest + 5) +
                "%2Cmeasure_2%5E" + (sleeve - 5) + "%5E" + (sleeve + 5); // 원하는 url

        return startData(URL, userInfo.getUserGender());
    }

    @Override
    public List<DataDto> getCommendShoesItem(UserDto userInfo) {

        String URL = "https://www.musinsa.com/categories/item/005?shoeSizeOption="
                + userInfo.getUserFoot(); // 원하는 url

        return startData(URL, userInfo.getUserGender());
    }

    public List<DataDto> startData(String URL, int gender){

        Document doc;
        List<DataDto> list = new ArrayList<>();

        try {
            doc = Jsoup.connect(URL)
                    .userAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.152 Safari/537.36")
                    .get(); // 원하는 url에서 전체 구조를 받아온다

            if(doc.select("#searchList > li:nth-child(1)").toString().equals(""))
                return null;

            for(int i=1;i<=90;i++) {
                if(doc.select("#searchList > li:nth-child("+i+")").toString().equals(""))
                    break;

                if(gender == 1 && !doc.select("#searchList > li:nth-child("+i+") > div.icon_group > ul > li.icon_man.sight_out").toString().equals(""))
                    continue;
                if(gender == 0 && !doc.select("#searchList > li:nth-child("+i+") > div.icon_group > ul > li.icon_woman.sight_out").toString().equals(""))
                    continue;

                DataDto data = new DataDto();

                data.setNo(i);

                Elements el = doc.select("#searchList > li:nth-child(" + i + ") > div.icon_new");
                if(!el.text().equals(""))
                    data.setSale(el.text());

                data.setImgLink(doc.select("#searchList > li:nth-child("+i+") > div.li_inner > div.list_img > a > img").attr("abs:data-original"));
                data.setMaker(doc.select("#searchList > li:nth-child("+i+") > div.li_inner > div.article_info > p.item_title > a").text());
                data.setLink(doc.select("#searchList > li:nth-child("+i+") > div.li_inner > div.article_info > p.list_info > a").attr("abs:href"));
                data.setTitle(doc.select("#searchList > li:nth-child("+i+") > div.li_inner > div.article_info > p.list_info > a").text());

                System.out.println("asldkjaskldjaiklsdjas : " + doc.select("#searchList > li:nth-child("+i+") > div.li_inner > div.article_info > p.list_info > a").text());

                el = doc.select("#searchList > li:nth-child("+i+") > div.li_inner > div.article_info > p.price > del");
                if(!el.text().equals("")){
                    data.setBeforePrice(el.text());
                    data.setAfterPrice(doc.select("#searchList > li:nth-child("+i+") > div.li_inner > div.article_info > p.price").text().split(" ")[1]);
                }
                else
                    data.setAfterPrice(doc.select("#searchList > li:nth-child("+i+") > div.li_inner > div.article_info > p.price").text());


                list.add(data);
            }

            return list;

        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

}
