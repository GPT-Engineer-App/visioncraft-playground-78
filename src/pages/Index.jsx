import React, { useState, useEffect } from "react";
import { Box, Button, Container, Flex, FormControl, FormLabel, Heading, Input, Select, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Stack, Switch, Text, Textarea, useColorMode, useColorModeValue, Image, useToast } from "@chakra-ui/react";
import { FaMagic, FaMoon, FaSun } from "react-icons/fa";

const Index = () => {
  const { toggleColorMode } = useColorMode();
  const colorMode = useColorModeValue("light", "dark");
  const toast = useToast();
  const [token, setToken] = useState("");
  const [prompt, setPrompt] = useState("");
  const [model, setModel] = useState("RealVisXLV40Turbo-40");
  const [models, setModels] = useState([]);
  const [sampler, setSampler] = useState("Euler a");
  const [samplers, setSamplers] = useState([]);
  const [cfgScale, setCfgScale] = useState(7);
  const [width, setWidth] = useState(1024);
  const [height, setHeight] = useState(1024);
  const [advancedSettings, setAdvancedSettings] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);

  const predefinedPrompts = ["A beautiful landscape with mountains and rivers", "A futuristic city with flying cars", "A serene beach at sunset", "A bustling market in a medieval town", "A majestic dragon flying over a castle"];

  useEffect(() => {
    // Fetch models
    fetch("https://visioncraft.top/sd/models-sdxl")
      .then((response) => response.json())
      .then((data) => setModels(data))
      .catch((error) => console.error("Error fetching models:", error));

    // Fetch samplers
    fetch("https://visioncraft.top/sd/samplers")
      .then((response) => response.json())
      .then((data) => setSamplers(data))
      .catch((error) => console.error("Error fetching samplers:", error));
  }, []);

  const handleGenerateImage = () => {
    const requestBody = {
      token,
      model,
      prompt,
      negative_prompt: "Ugly, Disfigured, Deformed, Low quality, Pixelated, Blurry, Grains, Text, Watermark, Signature, Out of frame, Disproportioned, Bad proportions, Gross proportions, Bad anatomy, Duplicate, Cropped, Extra hands, Extra arms, Extra legs, Extra fingers, Extra limbs, Long neck, Mutation, Mutilated, Mutated hands, Poorly drawn face, Poorly drawn hands, Missing hands, Missing arms, Missing legs, Missing fingers, Low resolution, Morbid.",
      steps: 30,
      width,
      height,
      sampler,
      cfg_scale: cfgScale,
    };

    fetch("https://visioncraft.top/sd", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((data) => {
        const imageUrl = `data:image/png;base64,${data.image}`;
        setGeneratedImage(imageUrl);
      })
      .catch((error) => {
        console.error("Error generating image:", error);
        toast({
          title: "Error",
          description: "Failed to generate image. Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  const handleRandomPrompt = () => {
    const randomPrompt = predefinedPrompts[Math.floor(Math.random() * predefinedPrompts.length)];
    setPrompt(randomPrompt);
  };

  return (
    <Container maxW="container.md" py={8}>
      <Flex justify="space-between" align="center" mb={8}>
        <Heading as="h1" size="xl" color="green.400">
          VisionCraft Playground
        </Heading>
        <Button onClick={toggleColorMode}>{colorMode === "light" ? <FaMoon /> : <FaSun />}</Button>
      </Flex>
      <Stack spacing={4}>
        <FormControl id="token">
          <FormLabel>API Token</FormLabel>
          <Input type="text" value={token} onChange={(e) => setToken(e.target.value)} />
        </FormControl>
        <FormControl id="model">
          <FormLabel>Model</FormLabel>
          <Select value={model} onChange={(e) => setModel(e.target.value)}>
            {models.map((model, index) => (
              <option key={index} value={model}>
                {model}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl id="prompt">
          <FormLabel>Prompt</FormLabel>
          <Flex>
            <Textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} />
            <Button onClick={handleRandomPrompt} ml={2}>
              <FaMagic />
            </Button>
          </Flex>
        </FormControl>
        <FormControl id="dimensions">
          <FormLabel>Dimensions</FormLabel>
          <Select
            value={`${width}x${height}`}
            onChange={(e) => {
              const [w, h] = e.target.value.split("x").map(Number);
              setWidth(w);
              setHeight(h);
            }}
          >
            <option value="1024x1024">Square (1024x1024)</option>
            <option value="1024x720">Horizontal (1024x720)</option>
            <option value="720x1024">Vertical (720x1024)</option>
          </Select>
        </FormControl>
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="advanced-settings" mb="0">
            Advanced Settings
          </FormLabel>
          <Switch id="advanced-settings" isChecked={advancedSettings} onChange={() => setAdvancedSettings(!advancedSettings)} />
        </FormControl>
        {advancedSettings && (
          <Box p={4} borderWidth={1} borderRadius="md">
            <FormControl id="sampler">
              <FormLabel>Sampler</FormLabel>
              <Select placeholder="Select sampler" value={sampler} onChange={(e) => setSampler(e.target.value)}>
                {samplers.map((sampler, index) => (
                  <option key={index} value={sampler}>
                    {sampler}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl id="cfg-scale" mt={4}>
              <FormLabel>CFG Scale</FormLabel>
              <Slider defaultValue={7} min={3} max={15} step={1} value={cfgScale} onChange={(val) => setCfgScale(val)}>
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
              <Text mt={2}>Value: {cfgScale}</Text>
            </FormControl>
          </Box>
        )}
        <Button colorScheme="green" onClick={handleGenerateImage}>
          Generate Image
        </Button>
        {generatedImage && (
          <Box mt={4}>
            <Image src={generatedImage} alt="Generated" />
          </Box>
        )}
      </Stack>
    </Container>
  );
};

export default Index;
