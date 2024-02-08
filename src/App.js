import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Radio,
  RadioGroup,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import * as PropTypes from "prop-types";
import { useDaumPostcodePopup } from "react-daum-postcode";

function App(props) {
  const emptyRows = new Array(11).fill(null);

  // ----------------------- 거래처 정보 상태 -----------------------
  const [companyNumber, setCompanyNumber] = useState(""); // 사업자번호
  const [abbreviated, setAbbreviated] = useState(""); // 약칭
  const [companyName, setCompanyName] = useState(""); // 거래처명
  const [representative, setRepresentative] = useState(""); // 대표자명
  const [responsiblefor, setResponsiblefor] = useState(""); // 담당자명
  const [businessType, setBusinessType] = useState(""); // 업태
  const [items, setItems] = useState(""); // 종목
  const [postalCode, setPostalCode] = useState(""); // 우편번호
  const [primaryAddress, setPrimaryAddress] = useState(""); // 기본주소
  const [detailedAddress, setDetailedAddress] = useState(""); // 상세주소
  const [phoneNumber, setPhoneNumber] = useState(""); // 전화번호
  const [faxNumber, setFaxNumber] = useState(""); // 팩스번호
  const [homepageurl, setHomepageurl] = useState(""); // 홈페이지
  const [companyType, setCompanyType] = useState("법인"); // 법인여부
  const [countryType, setCountryType] = useState("국내"); // 해외여부
  // const [stopTrading, setStopTrading] = useState(""); // 거래중지
  const [contractPeriod1, setContractPeriod1] = useState(""); // 계약기간1
  const [contractPeriod2, setContractPeriod2] = useState(""); // 계약기간2
  const [registrationInformation, setRegistrationInformation] = useState(""); // 등록정보
  const [registrationDateTime, setRegistrationDateTime] = useState(""); // 등록날짜
  const [changeInformation, setChangeInformation] = useState(""); // 변경정보
  const [changeDateTime, setChangeDateTime] = useState(""); // 변경날짜

  const [offices, setOffices] = useState(""); // 사무소
  const [bankingInformation, setBankingInformation] = useState(""); // 은행정보
  const [accountNumber, setAccountNumber] = useState(""); // 계좌번호

  const toast = useToast();

  // Daum Postcode 스크립트 URL
  const scriptUrl =
    "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
  // Daum Postcode 팝업을 여는 함수
  const openPostcodePopup = useDaumPostcodePopup(scriptUrl);
  // 주소 검색 완료 핸들러
  const handleComplete = (data) => {
    let fullAddress = data.roadAddress; // 도로명 주소
    let extraAddress = "";

    // 도로명 주소에 부가 정보가 있다면 추가합니다.
    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress += extraAddress
          ? `, ${data.buildingName}`
          : data.buildingName;
      }
      fullAddress += extraAddress ? ` (${extraAddress})` : "";
    }

    // 우편번호 설정
    setPostalCode(data.zonecode);

    // 사용자가 도로명 주소를 선택했는지, 지번 주소를 선택했는지에 따라 기본 주소 상태를 설정합니다.
    if (data.userSelectedType === "R") {
      // 사용자가 도로명 주소를 선택한 경우
      setPrimaryAddress(fullAddress);
    } else {
      // 사용자가 지번 주소를 선택한 경우
      setPrimaryAddress(data.jibunAddress);
    }

    // 상세 주소는 사용자가 직접 입력하도록 비워둡니다.
    setDetailedAddress("");
  };

  // ------------------------------ 주소검색 버튼 클릭시 다음 postcode 팝업 열리게 하는 로직 ------------------------------
  const handlePostCodeClick = () => {
    openPostcodePopup({ onComplete: handleComplete });
  };

  // ------------------------------ 등록버튼 클릭시 서버로 전송 로직 ------------------------------
  function handleSubmit() {
    axios
      .post("/api/account/add", {
        custom: {
          companyNumber: companyNumber,
          abbreviated: abbreviated,
          companyName: companyName,
          representative: representative,
          responsiblefor: responsiblefor,
          businessType: businessType,
          items: items,
          postalCode: postalCode,
          primaryAddress: primaryAddress,
          detailedAddress: detailedAddress,
          phoneNumber: phoneNumber,
          faxNumber: faxNumber,
          homepageurl: homepageurl,
          companyType: companyType,
          countryType: countryType,
          contractPeriod1: contractPeriod1,
          contractPeriod2: contractPeriod2,
          registrationInformation: registrationInformation,
          registrationDateTime: registrationDateTime,
          changeInformation: changeInformation,
          changeDateTime: changeDateTime,
        },
        account: {
          offices: offices,
          bankingInformation: bankingInformation,
          accountNumber: accountNumber,
          companyNumber: companyNumber,
        },
      })
      .then(() => {
        toast({
          description: "거래처 등록 되었습니다.",
          status: "success",
        });
      })
      .catch(() => {
        toast({
          description: "거래처 등록 중 오류 발생하였습니다.",
          status: "error",
        });
      });
  }

  // ------------------------------ 초기화 버튼 클릭시 실행되는 로직 ------------------------------
  function handleReset() {
    setCompanyNumber("");
    setAbbreviated("");
    setCompanyName("");
    setRepresentative("");
    setResponsiblefor("");
    setBusinessType("");
    setItems("");
    setPostalCode("");
    setPrimaryAddress("");
    setDetailedAddress("");
    setPhoneNumber("");
    setFaxNumber("");
    setHomepageurl("");
    setCompanyType("법인");
    setCountryType("국내");
    setContractPeriod1("");
    setContractPeriod2("");
    setRegistrationInformation("");
    setRegistrationDateTime("");
    setChangeInformation("");
    setChangeDateTime("");
    setOffices("");
    setBankingInformation("");
    setAccountNumber("");
  }

  return (
    <Box justifyContent="center" minW={"1200px"} p={10}>
      <Box>
        <Text
          bg={"#eeeeee"}
          h={"50px"}
          alignItems={"center"}
          justifyContent={"center"}
          display={"flex"}
          textAlign={"center"}
          fontWeight={"bold"}
        >
          거래처 관리 시스템
        </Text>
      </Box>

      <Box
        mt={5}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Flex gap={4} w={"1375px"} justifyContent={"flex-end"}>
          <Button onClick={handleReset}>초기화</Button>
          <Button onClick={handleSubmit}>등록</Button>
          <Button>수정</Button>
          <Button>삭제</Button>
        </Flex>
      </Box>

      {/* ------------------------ 거래처 검색 하는곳 ------------------------*/}
      <Flex justifyContent={"center"} mt={5} alignItems={"start"}>
        <Box borderWidth={"2px"} maxW={"404px"}>
          <Box p={3}>
            <HStack mt={5}>
              <Text w={"150px"}>사업자 번호</Text>
              <Input borderWidth={"2px"} borderRadius={0} />
            </HStack>
            <HStack mt={10} mb={5}>
              <Text w={"150px"}>거래처명</Text>
              <Input borderWidth={"2px"} borderRadius={0} />
            </HStack>
          </Box>
          <Box
            alignItems={"flex-end"}
            display={"flex"}
            justifyContent={"center"}
            mb={8}
            ml={5}
            mr={3}
          >
            <Button borderWidth={"2px"} borderRadius={0}>
              조회
            </Button>
          </Box>
          <Table
            align="stretch"
            borderWidth={"1px"}
            w={"400px"}
            textAlign={"center"}
          >
            {/* 헤더 부분 */}
            <Flex>
              <Box
                borderRightWidth={"1px"}
                borderBottomWidth={"1px"}
                p={3}
                w={"200px"}
              >
                <Text fontWeight={"bold"}>사업자 번호</Text>
              </Box>
              <Box borderBottomWidth={"1px"} p={3} w={"200px"}>
                <Text fontWeight={"bold"}>거래처명</Text>
              </Box>
            </Flex>
            {/* 데이터 리스트 부분 */}
            {emptyRows.map((index) => (
              <Flex h={"49px"} key={index}>
                <Box
                  p={3}
                  w={"200px"}
                  borderBottomWidth={"1px"}
                  borderRightWidth={"1px"}
                >
                  <Text>&nbsp;</Text>
                </Box>
                <Box p={3} w={"200px"} borderBottomWidth={"1px"}>
                  <Text>&nbsp;</Text>
                </Box>
              </Flex>
            ))}
          </Table>
        </Box>

        {/* ------------------------ 거래처 CRUD 하는곳 ------------------------ */}
        <Box p={2} ml={5} w={"950px"} h={"850px"} borderWidth={"2px"}>
          <FormControl mt={4}>
            <HStack>
              <FormLabel w={"80px"}>
                <Flex mt={2} justifyContent={"space-between"}>
                  <Text>사</Text> <Text>업</Text> <Text>자</Text>{" "}
                  <Text>번</Text> <Text>호</Text>
                </Flex>
              </FormLabel>
              <Input
                value={companyNumber}
                onChange={(e) => setCompanyNumber(e.target.value)}
                w={"230px"}
                mr={28}
              />

              <FormLabel w={"80px"}>
                <Flex mt={2} justifyContent="space-between">
                  <Text>약</Text> <Text>칭</Text>
                </Flex>
              </FormLabel>
              <Input
                value={abbreviated}
                onChange={(e) => setAbbreviated(e.target.value)}
                w={"250px"}
              />
            </HStack>
          </FormControl>

          <FormControl mt={4}>
            <HStack>
              <FormLabel w={"80px"}>
                <Flex mt={2} justifyContent="space-between">
                  <Text>거</Text> <Text>래</Text> <Text>처</Text>
                  <Text>명</Text>
                </Flex>
              </FormLabel>
              <Input
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                w={"450px"}
              />
            </HStack>
          </FormControl>

          <FormControl mt={4}>
            <HStack>
              <FormLabel w={"80px"}>
                <Flex mt={2} justifyContent="space-between">
                  <Text>대</Text> <Text>표</Text> <Text>자</Text>
                </Flex>
              </FormLabel>
              <Input
                value={representative}
                onChange={(e) => setRepresentative(e.target.value)}
                w={"230px"}
                mr={28}
              />

              <FormLabel w={"80px"}>
                <Flex mt={2} justifyContent="space-between">
                  <Text>담</Text> <Text>당</Text> <Text>자</Text>
                </Flex>
              </FormLabel>
              <Input
                value={responsiblefor}
                onChange={(e) => setResponsiblefor(e.target.value)}
                w={"250px"}
              />
            </HStack>
          </FormControl>

          <FormControl mt={4}>
            <HStack>
              <FormLabel w={"80px"}>
                <Flex mt={2} justifyContent={"space-between"}>
                  <Text>업</Text> <Text>태</Text>
                </Flex>
              </FormLabel>
              <Input
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
                w={"230px"}
                mr={28}
              />

              <FormLabel w={"80px"}>
                <Flex mt={2} justifyContent="space-between">
                  <Text>종</Text> <Text>목</Text>
                </Flex>
              </FormLabel>
              <Input
                value={items}
                onChange={(e) => setItems(e.target.value)}
                w={"250px"}
              />
            </HStack>
          </FormControl>

          <FormControl mt={4}>
            <HStack>
              <FormLabel w={"80px"}>
                <Flex mt={2} justifyContent={"space-between"}>
                  <Text>우</Text> <Text>편</Text> <Text>번</Text>{" "}
                  <Text>호</Text>
                </Flex>
              </FormLabel>
              <Input
                readOnly
                onChange={(e) => setPostalCode(e.target.value)}
                value={postalCode}
                w={"230px"}
              />
              <Button mr={10} onClick={handlePostCodeClick}>
                검색
              </Button>

              <FormLabel w={"80px"}>
                <Flex mt={2} justifyContent="space-between">
                  <Text>기</Text> <Text>본</Text> <Text>주</Text>{" "}
                  <Text>소</Text>
                </Flex>
              </FormLabel>
              <Input
                value={primaryAddress}
                onChange={(e) => setPrimaryAddress(e.target.value)}
                w={"350px"}
              />
            </HStack>
          </FormControl>

          <FormControl mt={4}>
            <HStack>
              <FormLabel w={"80px"}>
                <Flex mt={2} justifyContent="space-between">
                  <Text>상</Text> <Text>세</Text> <Text>주</Text>
                  <Text>소</Text>
                </Flex>
              </FormLabel>
              <Input
                value={detailedAddress}
                onChange={(e) => setDetailedAddress(e.target.value)}
                w={"450px"}
              />
            </HStack>
          </FormControl>

          <FormControl mt={4}>
            <HStack>
              <FormLabel w={"80px"}>
                <Flex mt={2} justifyContent={"space-between"}>
                  <Text>전</Text> <Text>화</Text> <Text>번</Text>{" "}
                  <Text>호</Text>
                </Flex>
              </FormLabel>
              <Input
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                w={"230px"}
                mr={28}
              />

              <FormLabel w={"80px"}>
                <Flex mt={2} justifyContent="space-between">
                  <Text>팩</Text> <Text>스</Text> <Text>번</Text>{" "}
                  <Text>호</Text>
                </Flex>
              </FormLabel>
              <Input
                value={faxNumber}
                onChange={(e) => setFaxNumber(e.target.value)}
                w={"250px"}
              />
            </HStack>
          </FormControl>

          <FormControl mt={4}>
            <HStack>
              <FormLabel w={"80px"}>
                <Flex mt={2} justifyContent="space-between">
                  <Text>홈</Text> <Text>페</Text> <Text>이</Text>{" "}
                  <Text>지</Text>
                </Flex>
              </FormLabel>
              <Input
                value={homepageurl}
                onChange={(e) => setHomepageurl(e.target.value)}
                w={"450px"}
              />
            </HStack>
          </FormControl>

          <FormControl mt={4}>
            <HStack>
              <FormLabel w={"80px"}>
                <Flex mt={2} justifyContent={"space-between"}>
                  <Text>과</Text> <Text>세</Text> <Text>구</Text>{" "}
                  <Text>분</Text>
                </Flex>
              </FormLabel>
              <RadioGroup onChange={setCompanyType} value={companyType}>
                <HStack
                  justifyContent="center"
                  alignItems="center"
                  w="230px"
                  border="1px solid #E6EBF2"
                  h="35px"
                  borderRadius="5px"
                  mr={28}
                >
                  <Radio value="법인">
                    <Text>법인</Text>
                  </Radio>
                  <Radio value="개인">
                    <Text>개인</Text>
                  </Radio>
                </HStack>
              </RadioGroup>

              <FormLabel w={"80px"}>
                <Flex mt={2} justifyContent={"space-between"}>
                  <Text>해</Text> <Text>외</Text> <Text>여</Text>{" "}
                  <Text>부</Text>
                </Flex>
              </FormLabel>
              <RadioGroup onChange={setCountryType} value={countryType}>
                <HStack
                  justifyContent="center"
                  alignItems="center"
                  w="230px"
                  border="1px solid #E6EBF2"
                  h="35px"
                  borderRadius="5px"
                >
                  <Radio value="국내">
                    <Text>국내</Text>
                  </Radio>
                  <Radio value="해외">
                    <Text>해외</Text>
                  </Radio>
                </HStack>
              </RadioGroup>
            </HStack>
          </FormControl>

          {/*<FormControl mt={4}>*/}
          {/*  <HStack>*/}
          {/*    <FormLabel w={"80px"}>*/}
          {/*      <Flex justifyContent={"space-between"}>*/}
          {/*        <Text>거</Text> <Text>래</Text> <Text>중</Text>*/}
          {/*        <Text>지</Text>*/}
          {/*      </Flex>*/}
          {/*    </FormLabel>*/}
          {/*    <Checkbox*/}
          {/*      value={stopTrading}*/}
          {/*      onChange={(e) => setStopTrading(e.target.value)}*/}
          {/*      size={"lg"}*/}
          {/*      bottom={1}*/}
          {/*    />*/}
          {/*  </HStack>*/}
          {/*</FormControl>*/}

          <FormControl mt={4}>
            <HStack>
              <FormLabel w={"80px"}>
                <Flex mt={2} justifyContent={"space-between"}>
                  <Text>계</Text> <Text>약</Text> <Text>기</Text>
                  <Text>간</Text>
                </Flex>
              </FormLabel>
              <Input
                value={contractPeriod1}
                onChange={(e) => setContractPeriod1(e.target.value)}
                type="date"
                w={"230px"}
              />
              <Text>~</Text>
              <Input
                value={contractPeriod2}
                onChange={(e) => setContractPeriod2(e.target.value)}
                type="date"
                w={"230px"}
              />
            </HStack>
          </FormControl>

          <FormControl mt={4}>
            <HStack>
              <FormLabel w={"90px"}>
                <Flex mt={2} justifyContent={"space-between"}>
                  <Text>등</Text> <Text>록</Text> <Text>정</Text>
                  <Text>보</Text>
                </Flex>
              </FormLabel>
              <Input
                value={registrationInformation}
                onChange={(e) => setRegistrationInformation(e.target.value)}
                w={"130px"}
              />
              <Input
                value={registrationDateTime}
                onChange={(e) => setRegistrationDateTime(e.target.value)}
                type="datetime-local"
                w={"250px"}
                mr={7}
              />

              <FormLabel w={"80px"}>
                <Flex mt={2} justifyContent={"space-between"}>
                  <Text>변</Text> <Text>경</Text> <Text>정</Text>
                  <Text>보</Text>
                </Flex>
              </FormLabel>
              <Input
                value={changeInformation}
                onChange={(e) => setChangeInformation(e.target.value)}
                w={"130px"}
              />
              <Input
                value={changeDateTime}
                onChange={(e) => setChangeDateTime(e.target.value)}
                type="datetime-local"
                w={"250px"}
              />
            </HStack>
          </FormControl>

          <FormControl mt={5}>
            <Text fontWeight={"bold"}>(거래처 계좌정보)</Text>

            <Table>
              <Thead>
                <Tr>
                  <Th textAlign={"center"}>사무소</Th>
                  <Th textAlign={"center"}>은행</Th>
                  <Th textAlign={"center"}>계좌번호</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>
                    <Input
                      value={offices}
                      onChange={(e) => setOffices(e.target.value)}
                    />
                  </Td>
                  <Td>
                    <Input
                      value={bankingInformation}
                      onChange={(e) => setBankingInformation(e.target.value)}
                    />
                  </Td>
                  <Td>
                    <Input
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                    />
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </FormControl>
        </Box>
      </Flex>

      {/* ------------------------ 거래처 리스트 나오는곳 ------------------------ */}
    </Box>
  );
}

export default App;
