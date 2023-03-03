import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { SidebarContext } from "../context/SidebarContext";
import DistributionService from "../services/DistributionService";
import ProductServices from "../services/ProductServices";
import UserServices from "../services/UserServices";
import { notifyError, notifySuccess } from "../utils/toast";
import jwt from "jsonwebtoken";

const useProductSubmit = (id) => {
  const [imageUrl, setImageUrl] = useState("");
  const [children, setChildren] = useState("");
  const [tag, setTag] = useState([]);
  const [password, setPassword] = useState("");

  const { isDrawerOpen, closeDrawer, setIsUpdate } = useContext(SidebarContext);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const productData = {
      name: data.name,
      email: data.email,
      address: data.address,
      phone: data.phone,
      image: imageUrl,
      zipCode: data.zip,
      password: data.password,
      verified: true,
      baby: data.baby === "Yes",
    };

    if (id) {
      UserServices.updateCustomer(id, productData)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeDrawer();
    } else {
      const data = await jwt.sign(
        { ...productData },
        "lfjfjasjfsdfsfr09ri09wfsdfsdfrilfdjdj"
      );

      UserServices.addUser({ token: data })
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeDrawer();
    }
  };

  useEffect(() => {
    if (!isDrawerOpen) {
      setValue("name");
      setValue("email");
      setValue("password");
      setValue("phone");
      setValue("zip");
      setValue("address");
      return;
    }

    if (id) {
      UserServices.getUserById(id)
        .then((res) => {
          console.log(res);
          setPassword(res.password);
          if (res) {
            setValue("name", res.name);
            setValue("email", res.email);
            setValue("password", res.password);
            setValue("phone", res.phone);
            setValue("zip", res.zipCode);
            setValue("address", res.address);
            setValue("baby", res.baby ? "Yes" : "No");
            setImageUrl(res.image);
          }
        })
        .catch((err) => {
          notifyError("There is a server error!");
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, setValue, isDrawerOpen]);

  useEffect(() => {
    setChildren(watch("children"));
  }, [watch, children]);

  return {
    register,
    watch,
    handleSubmit,
    onSubmit,
    errors,
    imageUrl,
    setImageUrl,
    tag,
    setTag,
  };
};

export default useProductSubmit;
