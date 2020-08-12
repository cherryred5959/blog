import React, { useContext } from 'react';
import { graphql } from 'gatsby';
import {
  Columns,
  Column,
  Container,
  Content,
  Hero,
  HeroBody,
  Title,
  Subtitle
} from 'bloomer';
import Fade from 'react-reveal/Fade';

// Components
import Layout from '../components/layout';
import SEO from '../components/seo';
import BigProfilePic from '../components/big-profile-pic';

// Theme
import { ThemeContext } from '../contexts/theme';

const About = props => {
  const { theme } = useContext(ThemeContext);

  const { data, location } = props;
  const { keywords } = data.site.siteMetadata;

  return (
    <Layout location={location}>
      <SEO title="About" keywords={keywords || []} />
      <Hero isColor={theme} className="is-fullheight-with-navbar">
        <HeroBody>
          <Container>
            <Fade left>
              <React.Fragment>
                <Title>Resume</Title>
                <section>
                  <Subtitle>STACK</Subtitle>
                  <div>
                    <Content>
                      <p>PHP, Laravel, Doctrine</p>
                    </Content>
                  </div>
                </section>
                <hr/>
                <section>
                  <Subtitle>EXPERIENCE</Subtitle>
                  <div>
                    <Subtitle isSize={ 6 } tag='h5' isMarginless>(주)에어텔닷컴 [2018.04 ~ 2020.06]</Subtitle>
                    <Content>
                      <p>
                        <small>- Codeigniter 기반 B2B 및 관리자 서비스 유지보수 및 신규 개발 참여.</small>
                        <br/>
                        <small>- Laravel + Vuejs 기반 펀인이라는 B2C 서비스 유지보수 및 신규 개발 참여.</small>
                        <br/>
                        <small>- Laravel 기반에 사내 회계 시스템 개발 담당.</small>
                      </p>
                    </Content>
                  </div>
                </section>
                <hr/>
                <section>
                  <Subtitle>EDUCATION</Subtitle>
                  <div>
                    <Subtitle isSize={ 6 } tag='h5' isMarginless>경기상업고등학교 [2011 ~ 2015]</Subtitle>
                    <Content>
                      <p>
                        <small>- 글로벌금융과 졸업</small>
                      </p>
                    </Content>
                  </div>
                  <br/>
                  <div>
                    <Subtitle isSize={ 6 } tag='h5' isMarginless>인하공업전문대학 [2015 ~ 2015]</Subtitle>
                    <Content>
                      <p>
                        <small>- 컴퓨터정보과 중퇴</small>
                      </p>
                    </Content>
                  </div>
                </section>
                <hr/>
              </React.Fragment>
            </Fade>
          </Container>
        </HeroBody>
      </Hero>
      <Hero isFullHeight isColor={theme}>
        <HeroBody>
          <Container>
            <Columns isVCentered>
              <Column>
                <Fade left>
                  <React.Fragment>
                    <Title>
                      <span role="img" aria-label="jsx-a11y/accessible-emoji">
                        👋🏻
                      </span>
                    </Title>
                    <Content>
                      <p>
                        더 나은 코드를 작성하기 위해 개인 시간을 할애하는 것을 좋아하며, 최근엔 코틀린에 관심이 생겨 학습 중입니다.
                        또, 평소에 '소프트웨어 장인' 저서에서 얘기하는 장인정신을 업무에서 어떻게 녹여낼지 고민하는 편입니다.<br/>
                        <br/>
                        취미로는 플레이리스트에 나만 알고 싶은 노래를 찾아 추가하는 것과 파티 플레이가 가능한 온라인 게임 하기,
                        그리고 의류 쇼핑을 즐깁니다.
                      </p>
                    </Content>
                  </React.Fragment>
                </Fade>
              </Column>
              <Column>
                <Fade right>
                  <BigProfilePic
                    className="is-hidden-mobile"
                    style={{ margin: 'auto 0 auto auto' }}
                  />
                  <BigProfilePic
                    className="is-hidden-tablet"
                    style={{ margin: '2rem auto 0 auto' }}
                  />
                </Fade>
              </Column>
            </Columns>
          </Container>
        </HeroBody>
      </Hero>
    </Layout>
  );
};

export default About;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        keywords
        author
        email
      }
    }
  }
`;
