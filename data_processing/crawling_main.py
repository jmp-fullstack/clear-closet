from data_crawling.musinsa_crawling import musinsa_crawling
from data_crawling.secondwear_crawling import secondwear_crawling

def main():
    # 무신사 크롤링
    print("무신사 크롤링 시작...")
    musinsa_result = musinsa_crawling()

    # 세컨드웨어 크롤링
    print("세컨드웨어 크롤링 시작...")
    secondwear_result = secondwear_crawling()

if __name__ == "__main__":
    main()