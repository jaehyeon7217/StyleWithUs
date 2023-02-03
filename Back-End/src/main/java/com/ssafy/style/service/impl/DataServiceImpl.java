package com.ssafy.style.service.impl;

import com.ssafy.style.data.dto.DataDto;
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
        Document doc;
        List<DataDto> list = new ArrayList<>();

        try {
            doc = Jsoup.connect(URL)
                    .userAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.152 Safari/537.36")
                    .get(); // 원하는 url에서 전체 구조를 받아온다

            if(doc.select("#searchList > li:nth-child(1)").toString().equals(""))
                return null;

            for(int i=1;i<=90;i++) {
                DataDto data = new DataDto();

                data.setNo(i);

                Elements el = doc.select("#searchList > li:nth-child(" + i + ") > div.icon_new");
                if(!el.text().equals(""))
                    data.setSale(el.text());

                data.setImgLink(doc.select("#searchList > li:nth-child("+i+") > div.li_inner > div.list_img > a > img").attr("abs:data-original"));
                data.setMaker(doc.select("#searchList > li:nth-child("+i+") > div.li_inner > div.article_info > p.item_title > a").text());
                data.setLink(doc.select("#searchList > li:nth-child("+i+") > div.li_inner > div.article_info > p.list_info > a").attr("abs:href"));
                data.setTitle(doc.select("#searchList > li:nth-child("+i+") > div.li_inner > div.article_info > p.list_info > a").text());

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

}
