import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { SidebarContext } from "../context/SidebarContext";
import DistributionService from "../services/DistributionService";
import OrderServices from "../services/OrderServices";
import ProductServices from "../services/ProductServices";
import { notifyError, notifySuccess } from "../utils/toast";

const useProductSubmit = (id) => {
  const [imageUrl, setImageUrl] = useState("");
  const [cart, setCart] = useState("");

  const [shippingOption, setShippingOption] = useState("");

  const [children, setChildren] = useState("");
  const [tag, setTag] = useState([]);
  const { isDrawerOpen, closeDrawer, setIsUpdate } = useContext(SidebarContext);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const productData = {
      address: data.address,
      phone: data.phone,
      shippingOption: shippingOption,
      cart: cart,
    };

    if (id) {
      OrderServices.updateOrder(id, productData)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeDrawer();
    } else {
      DistributionService.addDistribution(productData)
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
      setValue("contact");
      setValue("address");
      setValue("shippingOption");
      return;
    }

    if (id) {
      OrderServices.getOrderById(id)
        .then((res) => {
          if (res) {
            console.log(res);
            setValue("contact", res.contact);
            setValue("address", res.address);
            setShippingOption(res.shippingOption);
            setCart(res.cart);
          }
        })
        .catch((err) => {
          console.log(err);
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
    shippingOption,
    setShippingOption,
    cart,
    setCart,
  };
};

export default useProductSubmit;
