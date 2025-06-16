import { toast } from "react-toastify";

export const options = [
  {
    value: "Github",
    label: "Github",
    icon: "/githubblack-icon.svg",
    defaultValue: "https://github.com/",
  },
  {
    value: "Frontend Mentor",
    label: "Frontend Mentor",
    icon: "/frontendmentorblack-icon.svg",
    defaultValue: "https://frontendmentor.io/profile/",
  },
  {
    value: "Twitter",
    label: "Twitter",
    icon: "/twitterblack-icon.svg",
    defaultValue: "https://x.com/",
  },
  {
    value: "Linkedin",
    label: "Linkedin",
    icon: "/linkedinblack-icon.svg",
    defaultValue: "https://www.linkedin.com/in/",
  },
  {
    value: "YouTube",
    label: "YouTube",
    icon: "/youtubeblack-icon.svg",
    defaultValue: "https://www.youtube.com/",
  },
  {
    value: "Facebook",
    label: "Facebook",
    icon: "/facebookblack-icon.svg",
    defaultValue: "https://www.facebook.com/",
  },
  {
    value: "Twitch",
    label: "Twitch",
    icon: "/twitchblack-icon.svg",
    defaultValue: "https://www.twitch.tv/",
  },
  {
    value: "Devto",
    label: "Dev.to",
    icon: "/devtodark-icon.svg",
    defaultValue: "https://dev.to/",
  },
  {
    value: "Codewars",
    label: "Codewars",
    icon: "/codewarsdark-icon.svg",
    defaultValue: "https://codewars.com/users/",
  },
  {
    value: "Codepen",
    label: "Codepen",
    icon: "/codependark-icon.svg",
    defaultValue: "https://www.codepen.io/",
  },
  {
    value: "FreeCodeCamp",
    label: "FreeCodeCamp",
    icon: "/freecodecampdark-icon.svg",
    defaultValue: "",
  },
  {
    value: "GitLab",
    label: "GitLab",
    icon: "/gitlabdark-icon.svg",
    defaultValue: "https://www.gitlab.com/",
  },
  {
    value: "Hashnode",
    label: "Hashnode",
    icon: "/hashnodedark-icon.svg",
    defaultValue: "https://www.hashnode.com/@",
  },
  {
    value: "StackOverflow",
    label: "Stack Overflow",
    icon: "/stackoverflowdark-icon.svg",
    defaultValue: "https://www.stackoverflow.com/users/",
  },
];

export function getPlatformColor(value) {
  if (value === "Github") return "bg-[#1A1A1A]";
  if (value === "Frontend Mentor") return "bg-[#FFFFFF}";
  if (value === "Twitter") return "bg-[#43B7E9]";
  if (value === "Linkedin") return "bg-[#2D68FF]";
  if (value === "YouTube") return "bg-[#EE3939]";
  if (value === "Devto") return "bg-[#333333]";
  if (value === "Codewars") return "bg-[#8A1A50]";
  if (value === "FreeCodeCamp") return "bg-[#302267]";
  if (value === "GitLab") return "bg-[#EB4925]";
  if (value === "Hashnode") return "bg-[#0330D1]";
  if (value === "StackOverflow") return "bg-[#EC7100]";
  if (value === "Facebook") return "bg-[#2442AC]";
  if (value === "Twitch") return "bg-[#EE3FC8]";

  return "";
}

export const validateLoginData = (formData) => {
  const newErrors = {};

  if (!formData.email.includes("@")) {
    newErrors.email = "Invalid email address";
  }
  if (formData.email === "") {
    newErrors.email = "Can't be empty";
  }

  if (formData.password.length < 8) {
    newErrors.password = "Please check again";
  }
  if (formData.password === "") {
    newErrors.password = "Can't be empty";
  }

  if (
    formData?.confirmPassword &&
    formData.password !== formData.confirmPassword
  ) {
    newErrors.password = "Please check again";
  }

  return newErrors;
};

export function validateLinksInputFields(amtOfLinkContainer) {
  const errors = amtOfLinkContainer
    .filter((container) => container.link === "")
    .map((container) => ({ id: container.id }));

  return errors;
}

export function handleLinkChange(link, id, setAmtOfLinkContainer) {
  setAmtOfLinkContainer((prevContaiers) =>
    prevContaiers.map((prevContaier) =>
      prevContaier.id === id ? { ...prevContaier, link } : prevContaier
    )
  );
}

export function handleImageChange(e, setUserDetails, setImage) {
  const file = e.target.files[0];
  handleImageUpload(file, setUserDetails, setImage);
}

export const handleDrop = (e, setUserDetails, setImage) => {
  e.preventDefault();
  const file = e.dataTransfer.files[0];

  handleImageUpload(file, setUserDetails, setImage);
};

export const handleDragOver = (e) => {
  e.preventDefault();
};

async function validateImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        if (img.width <= 1024 && img.height <= 1024) {
          resolve(true);
        } else {
          resolve(false);
        }
      };
      img.onerror = () => {
        reject(new Error("Failed to load image"));
      };

      img.src = event.target.result;
    };

    reader.readAsDataURL(file);
  });
}

async function handleImageUpload(file, setUserDetails, setImage) {
  if (!file) {
    return;
  }

  // Check file type
  if (!file.type.startsWith("image/")) {
    toast.error("Please upload an image file (PNG or JPG).");
    return;
  }

  try {
    const isValid = await validateImage(file);

    if (isValid) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUserDetails((prevUserDetails) => ({
          ...prevUserDetails,
          profilePicture: event.target.result,
        })); // Set preview URL for image
      };
      reader.readAsDataURL(file);
      setImage(file); // Store selected image file
    } else {
      setUserDetails((prevUserDetails) => ({
        ...prevUserDetails,
        profilePicture: prevUserDetails.profilePicture
          ? prevUserDetails.profilePicture
          : "",
      }));
      toast.error("Image size must not exceed 1024x1024 pixels");
    }
  } catch (error) {
    toast.error("Error validating image");
    console.error("Error validating image:", error.message);
  }
}

export const handleCopy = (id) => {
  console.log(`${window.location}/${id}`);
  navigator.clipboard
    .writeText(`${window.location}/${id}`)
    .then(() => {
      toast.success("Link copied to clipboard!");
    })
    .catch((err) => {
      toast.error("Failed to copy text: ", err);
    });
};

export function handleChangeLogin(e, setterFunc, variable, errors) {
  if (e.target.type === "email") {
    delete errors.email;
    setterFunc({
      ...variable,
      email: e.target.value,
    });
  }

  if (e.target.type === "password") {
    delete errors.password;
    setterFunc({
      ...variable,
      password: e.target.value,
    });
  }
}
